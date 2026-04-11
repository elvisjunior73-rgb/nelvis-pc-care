import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateLicenseCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments = [];
  for (let s = 0; s < 3; s++) {
    let seg = "";
    for (let i = 0; i < 4; i++) {
      seg += chars[Math.floor(Math.random() * chars.length)];
    }
    segments.push(seg);
  }
  return `NELVIS-${segments.join("-")}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MOLLIE_API_KEY = Deno.env.get("MOLLIE_API_KEY");
    if (!MOLLIE_API_KEY) {
      console.error("MOLLIE_API_KEY not set");
      return new Response("Config error", { status: 500 });
    }

    const body = await req.text();
    const params = new URLSearchParams(body);
    const paymentId = params.get("id");

    if (!paymentId) {
      console.error("No payment ID received");
      return new Response("Missing payment ID", { status: 400 });
    }

    console.log(`Webhook received for payment: ${paymentId}`);

    const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MOLLIE_API_KEY}` },
    });

    if (!mollieRes.ok) {
      console.error("Failed to fetch payment from Mollie:", await mollieRes.text());
      return new Response("Mollie fetch failed", { status: 500 });
    }

    const payment = await mollieRes.json();
    console.log(`Payment status: ${payment.status}, amount: ${payment.amount?.value}`);

    if (payment.status !== "paid") {
      console.log(`Payment ${paymentId} not paid (status: ${payment.status}), skipping`);
      return new Response("OK", { status: 200 });
    }

    // Extract customer email
    const customerEmail = payment.details?.consumerName
      ? null
      : (payment.metadata?.email || payment.billingAddress?.email || null);

    let email = customerEmail;
    if (!email && payment._links?.customer?.href) {
      try {
        const custRes = await fetch(payment._links.customer.href, {
          headers: { Authorization: `Bearer ${MOLLIE_API_KEY}` },
        });
        if (custRes.ok) {
          const customer = await custRes.json();
          email = customer.email;
        }
      } catch (e) {
        console.warn("Could not fetch customer email:", e);
      }
    }

    if (!email) {
      email = payment.consumerEmail || null;
    }

    console.log(`Customer email: ${email || "not found"}`);

    // Generate 6 license codes: 1 personal + 5 reseller
    const licenseCodes: string[] = [];
    for (let i = 0; i < 6; i++) {
      licenseCodes.push(generateLicenseCode());
    }
    const licenseCodesJson = JSON.stringify(licenseCodes);
    console.log(`Generated ${licenseCodes.length} license codes`);

    // Init Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store intervention with all codes as JSON
    const { error: insertError } = await supabase.from("interventions").insert({
      user_id: "00000000-0000-0000-0000-000000000000",
      category: "repair",
      description: `Paiement Mollie ${paymentId} - ${payment.amount?.value} ${payment.amount?.currency}`,
      status: "pending",
      email: email,
      license_code: licenseCodesJson,
    });

    if (insertError) {
      console.error("DB insert error:", insertError);
    } else {
      console.log("Intervention stored successfully");
    }

    // Store payment record
    await supabase.from("payments").insert({
      user_id: "00000000-0000-0000-0000-000000000000",
      mollie_payment_id: paymentId,
      amount: Number(payment.amount?.value || 0),
      currency: payment.amount?.currency || "EUR",
      status: "paid",
      description: `NELVIS PC Doctor - Pack Revendeur (6 codes)`,
    });

    // Send email with all license codes
    if (email) {
      try {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (RESEND_API_KEY) {
          const codesHtml = licenseCodes.map((code, i) => {
            const label = i === 0 ? "🖥️ Votre code personnel" : `🔑 Code revendeur #${i}`;
            return `
              <div style="background: ${i === 0 ? '#f0f0ff' : '#f9f9f9'}; border: ${i === 0 ? '2px solid #6366f1' : '1px solid #e0e0e0'}; border-radius: 10px; padding: 14px; margin: 8px 0; text-align: center;">
                <div style="font-size: 12px; color: #888; margin-bottom: 4px;">${label}</div>
                <span style="font-size: ${i === 0 ? '26px' : '22px'}; font-weight: bold; color: #6366f1; letter-spacing: 2px;">${code}</span>
              </div>`;
          }).join("");

          const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "NELVIS PC Doctor <noreply@nelvis-pc.com>",
              to: [email],
              subject: "Vos 6 codes licence NELVIS PC Doctor 🎉",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #6366f1; text-align: center;">🧠 NELVIS PC Doctor</h1>
                  <p>Bonjour,</p>
                  <p>Merci pour votre achat du <strong>Pack Revendeur</strong> ! Voici vos <strong>6 codes licence</strong> :</p>
                  ${codesHtml}
                  <div style="background: #fffbeb; border: 1px solid #f59e0b; border-radius: 10px; padding: 16px; margin: 20px 0;">
                    <h3 style="color: #b45309; margin: 0 0 8px;">💡 Comment gagner de l'argent ?</h3>
                    <p style="color: #92400e; margin: 0; font-size: 14px;">
                      Revendez vos 5 codes à <strong>10€-20€ chacun</strong>. Le prix moyen en boutique : 30-80€.<br/>
                      → Revendez à 10€ × 5 = <strong>50€ encaissés</strong><br/>
                      → Revendez à 20€ × 5 = <strong>100€ encaissés</strong>
                    </p>
                  </div>
                  <h2 style="color: #333;">Comment utiliser un code :</h2>
                  <ol style="color: #555; line-height: 1.8;">
                    <li>Téléchargez NELVIS PC Doctor depuis <a href="https://nelvis-pc.com/telecharger" style="color: #6366f1;">nelvis-pc.com/telecharger</a></li>
                    <li>Lancez le fichier en tant qu'administrateur</li>
                    <li>Entrez un code licence</li>
                    <li>Laissez NELVIS réparer le PC !</li>
                  </ol>
                  <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                    © NELVIS PC Doctor — nelvis-pc.com
                  </p>
                </div>
              `,
            }),
          });

          if (emailRes.ok) {
            console.log("License email sent successfully");
          } else {
            console.error("Email send failed:", await emailRes.text());
          }
        } else {
          console.warn("RESEND_API_KEY not configured, email not sent");
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal error", { status: 500 });
  }
});
