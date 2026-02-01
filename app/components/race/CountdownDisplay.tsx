import { motion, AnimatePresence } from "motion/react";

interface CountdownDisplayProps {
  countdown: number | null;
  isRacing: boolean;
  winner: any;
  onStartRace: () => void;
}

export default function CountdownDisplay({
  countdown,
  isRacing,
  winner,
  onStartRace,
}: CountdownDisplayProps) {
  if (isRacing || winner) return null;

  return (
    <div className="text-center mb-8">
      <AnimatePresence mode="wait">
        {countdown !== null ? (
          <motion.div
            key="countdown"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 1.2,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="relative"
          >
            <div className="text-9xl font-bold text-gray-900 dark:text-white">
              {countdown === 0 ? "GO!" : countdown}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="start-button"
            onClick={onStartRace}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 px-12 rounded-2xl text-2xl shadow-2xl relative overflow-hidden group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow:
                "0 0 30px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10">🚀 Start Race!</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
