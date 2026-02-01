import { motion, AnimatePresence } from "motion/react";
import type { Racer } from "./types";

interface WinnerBadgeProps {
  winner: Racer | null;
  showModal: boolean;
  onRaceAgain: () => void;
}

export default function WinnerBadge({
  winner,
  showModal,
  onRaceAgain,
}: WinnerBadgeProps) {
  if (!winner || showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{
            rotate: [0, -2, 2, -2, 2, 0],
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-linear-to-br from-yellow-300 via-yellow-400 to-orange-500 text-gray-900 rounded-2xl px-12 py-6 inline-block shadow-2xl border-2 border-yellow-200 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />

          <div className="flex items-center gap-6 relative z-10">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
              className="text-5xl drop-shadow-xl"
            >
              🏆
            </motion.div>

            {winner.emoji && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="shrink-0"
              >
                {winner.emoji.startsWith("data:image/") ||
                winner.emoji.startsWith("/") ? (
                  <img
                    src={winner.emoji}
                    alt={winner.name}
                    className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <span className="text-6xl">{winner.emoji}</span>
                )}
              </motion.div>
            )}

            <div className="text-left">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-black"
                style={{
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                Winner!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-gray-800"
              >
                {winner.name}
              </motion.p>
            </div>

            <motion.button
              onClick={onRaceAgain}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg relative overflow-hidden group ml-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">🔄</span>
                <span className="text-sm">Race Again</span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
