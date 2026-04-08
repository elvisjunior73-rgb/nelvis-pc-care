import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, LogOut, ExternalLink, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import NelvisFooter from "@/components/NelvisFooter";

const statusLabels: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "En attente", color: "bg-yellow-500/10 text-yellow-600", icon: Clock },
  in_progress: { label: "En cours", color: "bg-blue-500/10 text-blue-600", icon: Loader2 },
  completed: { label: "Terminé", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  cancelled: { label: "Annulé", color: "bg-red-500/10 text-red-600", icon: AlertCircle },
};

const MonEspace = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [interventions, setInterventions] = useState<Tables<"interventions">[]>([]);
  const [payments, setPayments] = useState<Tables<"payments">[]>([]);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/connexion");
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [{ data: p }, { data: i }, { data: pay }] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("interventions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("payments").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setProfile(p);
      setInterventions(i || []);
      setPayments(pay || []);
    };
    fetchData();

    // Real-time subscription for interventions
    const channel = supabase
      .channel("my-interventions")
      .on("postgres_changes", { event: "*", schema: "public", table: "interventions", filter: `user_id=eq.${user.id}` },
        () => { fetchData(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> 🧠 NELVIS
          </button>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>Admin</Button>
            )}
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-1" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold mb-2">Mon espace</h1>
          <p className="text-muted-foreground mb-8">Bienvenue, {profile?.full_name || user?.email}</p>

          {/* Interventions */}
          <section className="mb-10">
            <h2 className="font-heading text-xl font-semibold mb-4">Mes interventions</h2>
            {interventions.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                Aucune intervention pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {interventions.map((intv) => {
                  const s = statusLabels[intv.status];
                  const Icon = s.icon;
                  return (
                    <div key={intv.id} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="font-semibold text-foreground">{intv.category}</h3>
                          {intv.description && <p className="text-sm text-muted-foreground mt-1">{intv.description}</p>}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(intv.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={s.color}>
                            <Icon className="w-3 h-3 mr-1" /> {s.label}
                          </Badge>
                          {intv.remote_link && (
                            <a href={intv.remote_link} target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                              <ExternalLink className="w-3 h-3" /> Prise en main à distance
                            </a>
                          )}
                        </div>
                      </div>
                      {intv.admin_notes && (
                        <div className="mt-3 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Note du technicien :</span> {intv.admin_notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Payments */}
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Mes paiements</h2>
            {payments.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                Aucun paiement enregistré.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Description</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Montant</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b border-border/50">
                        <td className="py-3 px-2">{new Date(p.created_at).toLocaleDateString("fr-FR")}</td>
                        <td className="py-3 px-2">{p.description || "—"}</td>
                        <td className="py-3 px-2 text-right font-medium">{p.amount} {p.currency}</td>
                        <td className="py-3 px-2 text-right">
                          <Badge variant={p.status === "paid" ? "default" : "secondary"}>
                            {p.status === "paid" ? "Payé" : p.status === "pending" ? "En attente" : p.status === "failed" ? "Échoué" : "Remboursé"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </motion.div>
      </main>
      <NelvisFooter />
    </div>
  );
};

export default MonEspace;
