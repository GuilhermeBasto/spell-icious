import { motion, AnimatePresence } from "motion/react";

interface ConfettiEffectProps {
  show: boolean;
}

export default function ConfettiEffect({ show }: ConfettiEffectProps) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Confetti colorido */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              filter: `hue-rotate(${Math.random() * 360}deg)`,
            }}
            initial={{
              top: `-10%`,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              top: "110%",
              rotate: [0, 360, 720],
              scale: [0, 1, 0.5],
              x: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 0.8,
              ease: "easeIn",
            }}
          >
            {
              ["🎉", "🎊", "✨", "🌟", "⭐", "💫", "🎆", "🎇", "🏆", "🥇"][
                Math.floor(Math.random() * 10)
              ]
            }
          </motion.div>
        ))}
        {/* Fogos de artifício laterais */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: i % 2 === 0 ? "10%" : "90%",
              top: `${20 + Math.random() * 60}%`,
              backgroundColor: [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
              ][Math.floor(Math.random() * 5)],
            }}
            initial={{
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 4, 0],
              opacity: [1, 1, 0],
              x: (Math.random() - 0.5) * 300,
              y: (Math.random() - 0.5) * 300,
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
