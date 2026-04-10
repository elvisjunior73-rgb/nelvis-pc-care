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

    // Look up the payment to find the intervention
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

    // Find the intervention with license code linked to this payment
    const { data: intervention } = await supabase
      .from("interventions")
      .select("license_code, email, created_at")
      .ilike("description", `%${paymentId}%`)
      .single();

    return new Response(JSON.stringify({
      status: "paid",
      licenseCode: intervention?.license_code || null,
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
