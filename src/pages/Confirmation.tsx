import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NelvisFooter from "@/components/NelvisFooter";

type PaymentState = "loading" | "paid" | "pending" | "error";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<PaymentState>("loading");
  const [licenseCodes, setLicenseCodes] = useState<string[]>([]);
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

        if (result.status === "paid" && (result.licenseCodes?.length > 0 || result.licenseCode)) {
          const codes = result.licenseCodes?.length > 0 ? result.licenseCodes : [result.licenseCode];
          setLicenseCodes(codes);
          setEmail(result.email);
          setState("paid");
        } else if (result.status === "pending" || result.status === "not_found") {
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(fetchLicense, 3000);
            setState("pending");
          } else {
            setState("error");
          }
        } else {
          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(fetchLicense, 3000);
            setState("pending");
          } else {
            setState("error");
          }
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

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copié !");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(licenseCodes.join("\n"));
    toast.success("Tous les codes copiés !");
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
                Veuillez patienter, nous préparons vos codes licence.
              </p>
            </div>
          ) : state === "paid" && licenseCodes.length > 0 ? (
            <div className="space-y-8">
              <CheckCircle className="w-20 h-20 text-accent mx-auto" />
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                  Paiement confirmé ! 🎉
                </h1>
                <p className="text-muted-foreground">
                  Voici vos <strong>{licenseCodes.length} codes licence</strong> :
                </p>
              </div>

              {/* Personal code */}
              <div className="bg-primary/5 border-2 border-primary rounded-xl p-5 space-y-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">🖥️ Votre code personnel</p>
                <p className="text-2xl font-mono font-bold text-primary tracking-wider">
                  {licenseCodes[0]}
                </p>
                <Button onClick={() => copyCode(licenseCodes[0])} variant="outline" size="sm" className="gap-2">
                  <Copy className="w-3 h-3" /> Copier
                </Button>
              </div>

              {/* Reseller codes */}
              {licenseCodes.length > 1 && (
                <div className="space-y-3">
                  <h2 className="font-semibold text-foreground text-left">🔑 Vos 5 codes revendeurs</h2>
                  <div className="grid gap-2">
                    {licenseCodes.slice(1).map((code, i) => (
                      <div key={code} className="flex items-center justify-between bg-muted/50 border border-border rounded-lg px-4 py-3">
                        <div className="text-left">
                          <span className="text-xs text-muted-foreground">Code #{i + 1}</span>
                          <p className="font-mono font-semibold text-foreground tracking-wider text-sm">{code}</p>
                        </div>
                        <Button onClick={() => copyCode(code)} variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button onClick={copyAll} variant="outline" className="gap-2 w-full">
                    <Copy className="w-4 h-4" /> Copier tous les codes
                  </Button>
                </div>
              )}

              {/* Tips */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-left space-y-2">
                <h3 className="font-semibold text-accent-foreground">💡 Astuce revendeur</h3>
                <p className="text-sm text-muted-foreground">
                  Revendez vos 5 codes entre <strong>10€ et 20€</strong> chacun.
                  Le prix en boutique : 30-80€. Vous fixez votre prix, vous encaissez.
                </p>
                <p className="text-sm text-muted-foreground">
                  → À 10€ × 5 = <strong>50€</strong> | À 20€ × 5 = <strong>100€</strong>
                </p>
              </div>

              {email && (
                <p className="text-sm text-muted-foreground">
                  📧 Un email avec tous vos codes a été envoyé à <strong>{email}</strong>
                </p>
              )}

              <div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
                <h2 className="font-semibold text-foreground">Comment utiliser un code :</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                  <li>Téléchargez NELVIS PC Doctor ci-dessous</li>
                  <li>Lancez le fichier en tant qu'administrateur</li>
                  <li>Entrez le code licence</li>
                  <li>Laissez NELVIS réparer le PC !</li>
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
                Nous n'avons pas pu récupérer vos codes licence. Si vous avez payé, vérifiez votre email ou contactez-nous.
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
