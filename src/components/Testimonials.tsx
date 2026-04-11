import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Julien M.",
    location: "Lyon",
    text: "Mon PC ramait depuis des mois, j'ai testé NELVIS en 15 min c'était réglé. J'ai revendu les 5 codes à des collègues, 60€ de gagné pour 10€ investis.",
    stars: 5,
    tag: "Revendeur",
  },
  {
    name: "Sophie L.",
    location: "Bordeaux",
    text: "Je suis pas du tout technique, j'ai juste lancé le logiciel et entré le code. Mon PC portable est redevenu rapide comme au premier jour !",
    stars: 5,
    tag: "Utilisatrice",
  },
  {
    name: "Karim B.",
    location: "Marseille",
    text: "J'ai acheté 3 packs et je revends sur Le Bon Coin à 15€ le code. Les clients sont contents, moi aussi. Petit business facile.",
    stars: 5,
    tag: "Revendeur",
  },
  {
    name: "Marie D.",
    location: "Paris",
    text: "Le PC de mon fils était inutilisable. Après NELVIS, il redémarre en 20 secondes. Merci ! J'ai donné un code à ma voisine aussi.",
    stars: 4,
    tag: "Utilisatrice",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Quote className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Témoignages</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Ils ont testé NELVIS
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Utilisateurs et revendeurs partagent leur expérience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s < t.stars ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                  {t.tag}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed flex-1">"{t.text}"</p>
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t.name}</span> · {t.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
