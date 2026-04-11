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
    const url = new URL(req.url);
    const paymentId = url.searchParams.get("id");

    if (!paymentId) {
      return new Response(JSON.stringify({ error: "Missing payment ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: payment } = await supabase
      .from("payments")
      .select("*")
      .eq("mollie_payment_id", paymentId)
      .single();

    if (!payment) {
      return new Response(JSON.stringify({ error: "Payment not found", status: "not_found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (payment.status !== "paid") {
      return new Response(JSON.stringify({ error: "Payment not completed", status: "pending" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: intervention } = await supabase
      .from("interventions")
      .select("license_code, email, created_at")
      .ilike("description", `%${paymentId}%`)
      .single();

    // Parse license_code: could be JSON array or single string (legacy)
    let licenseCodes: string[] = [];
    if (intervention?.license_code) {
      try {
        const parsed = JSON.parse(intervention.license_code);
        if (Array.isArray(parsed)) {
          licenseCodes = parsed;
        } else {
          licenseCodes = [intervention.license_code];
        }
      } catch {
        licenseCodes = [intervention.license_code];
      }
    }

    return new Response(JSON.stringify({
      status: "paid",
      licenseCodes,
      // Keep backward compat
      licenseCode: licenseCodes[0] || null,
      email: intervention?.email || null,
    }), {
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
