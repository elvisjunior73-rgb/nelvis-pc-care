import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment revendre mes codes ?",
    answer:
      "C'est simple : vous recevez 5 codes après achat. Proposez un service de « nettoyage / réparation PC » autour de vous, sur les réseaux sociaux, Marketplace Facebook ou Le Bon Coin. Le client vous paie, vous lui transmettez un code + le lien de téléchargement. Il lance le logiciel, entre le code, son PC est réparé.",
  },
  {
    question: "Faut-il des compétences techniques ?",
    answer:
      "Aucune. NELVIS fait tout automatiquement. Vous n'avez besoin de rien installer ni configurer sur le PC du client. Vous donnez le code, le client s'occupe du reste.",
  },
  {
    question: "Combien puis-je gagner ?",
    answer:
      "Vous fixez votre prix. Le tarif moyen d'une réparation PC en boutique est entre 30€ et 80€. Si vous vendez chaque code 15€, vous gagnez 75€ pour un investissement de 10€. À 20€ par code : 100€ de bénéfice.",
  },
  {
    question: "Chaque code ne fonctionne qu'une seule fois ?",
    answer:
      "Oui. Chaque code licence est à usage unique. Une fois utilisé sur un PC, il ne peut pas être réutilisé. C'est ce qui garantit la valeur de votre revente.",
  },
  {
    question: "Comment le client utilise le code ?",
    answer:
      "Le client télécharge NELVIS PC Doctor depuis notre site, lance le programme en tant qu'administrateur, entre le code licence et laisse le logiciel travailler. En 15 minutes, son PC est nettoyé et optimisé.",
  },
  {
    question: "Y a-t-il un support client ?",
    answer:
      "Oui. Si votre client rencontre un problème, il peut nous contacter directement par email. Vous n'avez pas besoin de gérer le support technique.",
  },
  {
    question: "Puis-je racheter des packs ?",
    answer:
      "Bien sûr ! Vous pouvez acheter autant de packs que vous le souhaitez. Chaque achat de 10€ vous donne 1 code personnel + 5 codes revendeur.",
  },
];

const ResellerFAQ = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">FAQ</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir pour commencer à revendre.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default ResellerFAQ;
