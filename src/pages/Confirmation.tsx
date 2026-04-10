import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NelvisFooter from "@/components/NelvisFooter";

type PaymentState = "loading" | "paid" | "pending" | "error";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<PaymentState>("loading");
  const [licenseCode, setLicenseCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const paymentId = searchParams.get("id");

  useEffect(() => {
    if (!paymentId) {
      setState("error");
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;

    const fetchLicense = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-license", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: null,
        });

        // supabase.functions.invoke doesn't support query params easily,
        // so we'll call it directly
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/get-license?id=${paymentId}`,
          {
            headers: {
              "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
          }
        );

        const result = await res.json();

        if (result.status === "paid" && result.licenseCode) {
          setLicenseCode(result.licenseCode);
          setEmail(result.email);
          setState("paid");
        } else if (result.status === "pending" || (!result.licenseCode && attempts < maxAttempts)) {
          attempts++;
          setTimeout(fetchLicense, 3000);
          setState("pending");
        } else if (result.status === "not_found" && attempts < maxAttempts) {
          attempts++;
          setTimeout(fetchLicense, 3000);
          setState("pending");
        } else {
          setState("error");
        }
      } catch {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(fetchLicense, 3000);
          setState("pending");
        } else {
          setState("error");
        }
      }
    };

    fetchLicense();
  }, [paymentId]);

  const copyCode = () => {
    if (licenseCode) {
      navigator.clipboard.writeText(licenseCode);
      toast.success("Code licence copié !");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full text-center"
        >
          {state === "loading" || state === "pending" ? (
            <div className="space-y-6">
              <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Traitement de votre paiement...
              </h1>
              <p className="text-muted-foreground">
                Veuillez patienter, nous préparons votre code licence.
              </p>
            </div>
          ) : state === "paid" && licenseCode ? (
            <div className="space-y-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                  Paiement confirmé !
                </h1>
                <p className="text-muted-foreground">
                  Merci pour votre achat. Voici votre code licence :
                </p>
              </div>

              <div className="bg-primary/5 border-2 border-primary rounded-xl p-6 space-y-4">
                <p className="text-3xl font-mono font-bold text-primary tracking-wider">
                  {licenseCode}
                </p>
                <Button
                  onClick={copyCode}
                  variant="outline"
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copier le code
                </Button>
              </div>

              {email && (
                <p className="text-sm text-muted-foreground">
                  📧 Un email avec votre code a également été envoyé à <strong>{email}</strong>
                </p>
              )}

              <div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
                <h2 className="font-semibold text-foreground">Comment utiliser votre licence :</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                  <li>Téléchargez NELVIS PC Doctor ci-dessous</li>
                  <li>Lancez le fichier en tant qu'administrateur</li>
                  <li>Entrez le code licence ci-dessus</li>
                  <li>Laissez NELVIS réparer votre PC !</li>
                </ol>
              </div>

              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <Link to="/telecharger">
                  <Download className="w-5 h-5" />
                  Télécharger NELVIS PC Doctor
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Une erreur est survenue
              </h1>
              <p className="text-muted-foreground">
                Nous n'avons pas pu récupérer votre code licence. Si vous avez payé, vérifiez votre email ou contactez-nous.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/">Retour à l'accueil</Link>
                </Button>
                <Button asChild>
                  <Link to="/telecharger">Télécharger</Link>
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <NelvisFooter />
    </div>
  );
};

export default Confirmation;
