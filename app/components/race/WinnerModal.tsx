import { motion, AnimatePresence } from "motion/react";
import { getEmojiName } from "~/config/emojis";
import type { Racer } from "./types";

interface WinnerModalProps {
  winner: Racer | null;
  showModal: boolean;
  onClose: () => void;
  getGoogleMapsUrl: (restaurant: any) => string;
}

export default function WinnerModal({
  winner,
  showModal,
  onClose,
  getGoogleMapsUrl,
}: WinnerModalProps) {
  if (!winner || !showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Fireworks Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              initial={{
                left: `${50}%`,
                top: `${50}%`,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              {["🎉", "🎊", "✨", "🌟", "💫", "⭐"][i % 6]}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6,
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-4 border-yellow-400/30 relative"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(250, 204, 21, 0.3)",
                "0 0 60px rgba(250, 204, 21, 0.6)",
                "0 0 20px rgba(250, 204, 21, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Trophy Section */}
          <div className="relative overflow-hidden bg-linear-to-br from-yellow-400 via-orange-500 to-red-500 p-12 text-center">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-full bg-linear-to-b from-white/30 via-transparent to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 30}deg) translateX(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: 360,
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-9xl mb-4 relative z-10 drop-shadow-2xl"
            >
              🏆
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-black text-white mb-2 relative z-10 drop-shadow-lg tracking-tight"
              style={{
                textShadow:
                  "0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.3)",
              }}
            >
              {winner.emoji &&
              (winner.emoji.startsWith("data:image/") ||
                winner.emoji.startsWith("/"))
                ? `${getEmojiName(winner.emoji).toUpperCase()} WINS!`
                : "WINNER!"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/90 relative z-10 font-medium"
            >
              🎊 Time to celebrate at 🎊
            </motion.p>
          </div>

          {/* Restaurant Info Section */}
          <div className="p-10 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent" />

            <div className="text-center mb-8">
              {winner.emoji &&
                (winner.emoji.startsWith("data:image/") ||
                  winner.emoji.startsWith("/")) && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.6,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <img
                        src={winner.emoji}
                        alt={winner.name}
                        className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-yellow-400 relative z-10"
                      />
                    </div>
                  </motion.div>
                )}

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 mb-4"
              >
                {winner.name}
              </motion.h3>

              {winner.restaurant &&
                winner.restaurant.address !== "Manual entry" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    {winner.restaurant.address && (
                      <div className="flex items-start justify-center gap-3 text-gray-300">
                        <span className="text-2xl mt-1">📍</span>
                        <p className="text-lg max-w-md">
                          {winner.restaurant.address}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-6 flex-wrap">
                      {winner.restaurant.rating && (
                        <div className="flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20">
                          <span className="text-2xl">⭐</span>
                          <span className="text-xl font-bold text-yellow-400">
                            {winner.restaurant.rating.toFixed(1)}
                          </span>
                          {winner.restaurant.userRatingsTotal && (
                            <span className="text-sm text-gray-400">
                              ({winner.restaurant.userRatingsTotal})
                            </span>
                          )}
                        </div>
                      )}

                      {winner.restaurant.priceLevel && (
                        <div className="flex items-center gap-2 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
                          <span className="text-lg font-bold text-green-400">
                            {"€".repeat(winner.restaurant.priceLevel)}
                            <span className="text-gray-600">
                              {"€".repeat(4 - winner.restaurant.priceLevel)}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {winner.restaurant.types &&
                      winner.restaurant.types.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                          {winner.restaurant.types
                            .slice(0, 4)
                            .map((type, index) => (
                              <motion.span
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: 0.9 + index * 0.1,
                                  type: "spring",
                                }}
                                className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm font-medium border border-white/10"
                              >
                                {type}
                              </motion.span>
                            ))}
                        </div>
                      )}
                  </motion.div>
                )}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {winner.restaurant &&
                winner.restaurant.address !== "Manual entry" && (
                  <motion.a
                    href={getGoogleMapsUrl(winner.restaurant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-8 rounded-xl text-center flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-lg"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 60px rgba(249, 115, 22, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="text-2xl relative z-10">🗺️</span>
                    <span className="relative z-10 text-lg">
                      Open in Google Maps
                    </span>
                  </motion.a>
                )}
              <motion.button
                onClick={onClose}
                className="flex-1 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-5 px-8 rounded-xl flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(75, 85, 99, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="text-2xl relative z-10">🔄</span>
                <span className="relative z-10 text-lg">Race Again</span>
              </motion.button>
            </motion.div>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors border border-white/20"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-2xl">✕</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
