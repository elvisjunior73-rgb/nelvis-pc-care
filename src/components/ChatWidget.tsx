import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "33745994776";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

interface Message {
  id: number;
  text: string;
  from: "bot" | "user";
  options?: { label: string; value: string }[];
}

const FAQ_RESPONSES: Record<string, string> = {
  fonctionnement:
    "NELVIS PC Doctor scanne et répare automatiquement votre PC : nettoyage registre, fichiers temporaires, optimisation démarrage, etc. Il suffit de lancer le logiciel et d'entrer votre code licence. En ~15 minutes, votre PC est comme neuf !",
  codes:
    "Pour 10€, vous recevez 1 code personnel + 5 codes revendeurs. Chaque code est à usage unique et fonctionne sur n'importe quel PC Windows.",
  revente:
    "Revendez vos 5 codes au prix que vous souhaitez (10€–20€ par code). Proposez un service de « réparation PC » sur Facebook Marketplace, Le Bon Coin ou autour de vous. Le client entre le code, son PC est réparé. Vous encaissez.",
  telecharger:
    "Après achat, rendez-vous sur nelvis-pc.com/telecharger pour télécharger le logiciel. Lancez-le en tant qu'administrateur et entrez votre code licence.",
  probleme:
    "Si vous rencontrez un problème technique, je vous mets en contact avec notre conseiller. Un instant…",
};

const WELCOME_MESSAGE: Message = {
  id: 0,
  text: "Bonjour ! 👋 Je suis l'assistant NELVIS. Comment puis-je vous aider ?",
  from: "bot",
  options: [
    { label: "🖥️ Comment ça marche ?", value: "fonctionnement" },
    { label: "🔑 Combien de codes je reçois ?", value: "codes" },
    { label: "💰 Comment revendre ?", value: "revente" },
    { label: "📥 Comment télécharger ?", value: "telecharger" },
    { label: "⚠️ J'ai un problème", value: "probleme" },
  ],
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string, options?: Message["options"]) => {
    const id = idRef.current++;
    setMessages((prev) => [...prev, { id, text, from: "bot", options }]);
  };

  const handleOption = (value: string) => {
    const id = idRef.current++;
    const optionLabels: Record<string, string> = {
      fonctionnement: "Comment ça marche ?",
      codes: "Combien de codes je reçois ?",
      revente: "Comment revendre ?",
      telecharger: "Comment télécharger ?",
      probleme: "J'ai un problème",
    };

    setMessages((prev) => [
      ...prev,
      { id, text: optionLabels[value] || value, from: "user" },
    ]);

    setTimeout(() => {
      const response = FAQ_RESPONSES[value];
      if (value === "probleme") {
        addBotMessage(response);
        setTimeout(() => {
          addBotMessage(
            "💬 Cliquez ci-dessous pour parler à un conseiller sur WhatsApp :",
            [{ label: "📱 Ouvrir WhatsApp", value: "__whatsapp__" }]
          );
        }, 1000);
      } else if (response) {
        addBotMessage(response, [
          { label: "🔙 Autre question", value: "__menu__" },
          { label: "📱 Parler à un conseiller", value: "__whatsapp__" },
        ]);
      }
    }, 500);
  };

  const handleMenuOrWhatsapp = (value: string) => {
    if (value === "__whatsapp__") {
      window.open(
        `${WHATSAPP_URL}?text=${encodeURIComponent("Bonjour, j'ai une question sur NELVIS PC Doctor.")}`,
        "_blank"
      );
    } else if (value === "__menu__") {
      addBotMessage(
        "Que souhaitez-vous savoir ?",
        WELCOME_MESSAGE.options
      );
    } else {
      handleOption(value);
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");

    const id = idRef.current++;
    setMessages((prev) => [...prev, { id, text, from: "user" }]);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let matched = false;
      const keywords: Record<string, string[]> = {
        fonctionnement: ["marche", "fonctionne", "comment", "quoi"],
        codes: ["code", "combien", "licence", "clé"],
        revente: ["revend", "gagner", "argent", "vendre"],
        telecharger: ["télécharger", "download", "installer"],
        probleme: ["problème", "erreur", "bug", "aide", "help", "marche pas"],
      };

      for (const [key, words] of Object.entries(keywords)) {
        if (words.some((w) => lower.includes(w))) {
          const response = FAQ_RESPONSES[key];
          if (key === "probleme") {
            addBotMessage(response);
            setTimeout(() => {
              addBotMessage(
                "💬 Cliquez ci-dessous pour parler à un conseiller :",
                [{ label: "📱 Ouvrir WhatsApp", value: "__whatsapp__" }]
              );
            }, 1000);
          } else {
            addBotMessage(response, [
              { label: "🔙 Autre question", value: "__menu__" },
              { label: "📱 Parler à un conseiller", value: "__whatsapp__" },
            ]);
          }
          matched = true;
          break;
        }
      }

      if (!matched) {
        addBotMessage(
          "Je ne suis pas sûr de comprendre votre question. Voulez-vous parler à un conseiller ?",
          [
            { label: "📱 Ouvrir WhatsApp", value: "__whatsapp__" },
            { label: "🔙 Voir les questions fréquentes", value: "__menu__" },
          ]
        );
      }
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            aria-label="Ouvrir le chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🧠</div>
                <div>
                  <p className="font-semibold text-sm">NELVIS Assistant</p>
                  <p className="text-xs text-white/80">En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-[#25D366] text-white rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleMenuOrWhatsapp(opt.value)}
                            className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                          >
                            {opt.label}
                            {opt.value === "__whatsapp__" && <ExternalLink className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tapez votre message..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] h-9 w-9 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
