import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Wrench, CreditCard, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import NelvisFooter from "@/components/NelvisFooter";

type Tab = "overview" | "users" | "interventions" | "payments";

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("overview");
  const [profiles, setProfiles] = useState<Tables<"profiles">[]>([]);
  const [interventions, setInterventions] = useState<Tables<"interventions">[]>([]);
  const [payments, setPayments] = useState<Tables<"payments">[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, loading, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetch = async () => {
      const [{ data: p }, { data: i }, { data: pay }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("interventions").select("*").order("created_at", { ascending: false }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
      ]);
      setProfiles(p || []);
      setInterventions(i || []);
      setPayments(pay || []);
    };
    fetch();

    const ch = supabase
      .channel("admin-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "interventions" }, () => fetch())
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => fetch())
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => fetch())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [isAdmin]);

  const updateIntervention = async (id: string, field: string, value: string) => {
    const { error } = await supabase.from("interventions").update({ [field]: value }).eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else toast({ title: "Mis à jour !" });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  const totalRevenue = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + Number(p.amount), 0);

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Vue d'ensemble", icon: Wrench },
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "interventions", label: "Interventions", icon: Wrench },
    { id: "payments", label: "Paiements", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-heading font-bold text-lg text-primary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> 🧠 NELVIS Admin
          </button>
          <Button variant="outline" size="sm" onClick={() => navigate("/mon-espace")}>Mon espace</Button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map(t => (
              <Button key={t.id} variant={tab === t.id ? "default" : "outline"} size="sm" onClick={() => setTab(t.id)}>
                <t.icon className="w-4 h-4 mr-1" /> {t.label}
              </Button>
            ))}
          </div>

          {/* Overview */}
          {tab === "overview" && (
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{profiles.length}</p>
                <p className="text-sm text-muted-foreground">Inscrits</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Wrench className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{interventions.length}</p>
                <p className="text-sm text-muted-foreground">Interventions</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <CreditCard className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{totalRevenue.toFixed(2)} €</p>
                <p className="text-sm text-muted-foreground">Revenus</p>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Nom</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Téléphone</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Inscrit le</th>
                </tr></thead>
                <tbody>
                  {profiles.map(p => (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="py-3 px-2">{p.full_name || "—"}</td>
                      <td className="py-3 px-2">{p.email || "—"}</td>
                      <td className="py-3 px-2">{p.phone || "—"}</td>
                      <td className="py-3 px-2">{new Date(p.created_at).toLocaleDateString("fr-FR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Interventions */}
          {tab === "interventions" && (
            <div className="space-y-4">
              {interventions.map(intv => (
                <div key={intv.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h3 className="font-semibold">{intv.category}</h3>
                      <p className="text-xs text-muted-foreground">{intv.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">User: {intv.user_id.slice(0, 8)}...</p>
                    </div>
                    <Select defaultValue={intv.status} onValueChange={(v) => updateIntervention(intv.id, "status", v)}>
                      <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="in_progress">En cours</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Input
                      placeholder="Lien prise en main (AnyDesk/TeamViewer)"
                      defaultValue={intv.remote_link || ""}
                      onBlur={e => { if (e.target.value !== (intv.remote_link || "")) updateIntervention(intv.id, "remote_link", e.target.value); }}
                      className="flex-1 text-sm"
                    />
                    <Input
                      placeholder="Notes admin"
                      defaultValue={intv.admin_notes || ""}
                      onBlur={e => { if (e.target.value !== (intv.admin_notes || "")) updateIntervention(intv.id, "admin_notes", e.target.value); }}
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>
              ))}
              {interventions.length === 0 && (
                <div className="text-center text-muted-foreground py-12">Aucune intervention.</div>
              )}
            </div>
          )}

          {/* Payments */}
          {tab === "payments" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Mollie ID</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Montant</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Statut</th>
                </tr></thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="py-3 px-2">{new Date(p.created_at).toLocaleDateString("fr-FR")}</td>
                      <td className="py-3 px-2">{p.description || "—"}</td>
                      <td className="py-3 px-2 text-xs font-mono">{p.mollie_payment_id || "—"}</td>
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
        </motion.div>
      </main>
      <NelvisFooter />
    </div>
  );
};

export default Admin;
