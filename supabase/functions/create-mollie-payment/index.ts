import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MOLLIE_API_KEY = Deno.env.get("MOLLIE_API_KEY");
    if (!MOLLIE_API_KEY) {
      return new Response(JSON.stringify({ error: "Payment configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { type, amount, description, userId, interventionId } = await req.json();

    if (!type || !amount || !userId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const redirectUrl = `${req.headers.get("origin") || "https://nelvis-pc-doctor.lovable.app"}/mon-espace`;

    const mollieRes = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MOLLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: { currency: "EUR", value: String(Number(amount).toFixed(2)) },
        description: description || `NELVIS - ${type}`,
        redirectUrl,
        metadata: { userId, interventionId, type },
      }),
    });

    const mollieData = await mollieRes.json();

    if (!mollieRes.ok) {
      console.error("Mollie error:", mollieData);
      return new Response(JSON.stringify({ error: "Payment creation failed", details: mollieData }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save payment in DB
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("payments").insert({
      user_id: userId,
      intervention_id: interventionId || null,
      mollie_payment_id: mollieData.id,
      amount: Number(amount),
      currency: "EUR",
      status: "pending",
      description: description || `NELVIS - ${type}`,
    });

    const checkoutUrl = mollieData._links?.checkout?.href;

    return new Response(JSON.stringify({ checkoutUrl, paymentId: mollieData.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
