import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Key, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Monitor, label: "PC réparés", target: 2847, suffix: "+" },
  { icon: Key, label: "Codes activés", target: 4312, suffix: "+" },
  { icon: Users, label: "Revendeurs actifs", target: 186, suffix: "" },
  { icon: TrendingUp, label: "Taux de satisfaction", target: 98, suffix: "%" },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="font-heading text-3xl sm:text-4xl font-bold text-primary tabular-nums">
      {count.toLocaleString("fr-FR")}{suffix}
    </span>
  );
}

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <s.icon className="w-6 h-6 text-accent mx-auto" />
              <AnimatedCounter target={s.target} suffix={s.suffix} inView={inView} />
              <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsCounter;
