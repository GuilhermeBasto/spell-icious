import { motion } from "motion/react";
import { getEmojiName } from "~/config/emojis";
import Avatar from "../Avatar";
import type { Racer } from "./types";

interface RaceLaneProps {
  racer: Racer;
  index: number;
  isRacing: boolean;
}

export default function RaceLane({ racer, index, isRacing }: RaceLaneProps) {
  return (
    <motion.div
      key={index}
      initial={{ x: -200, opacity: 0, rotateY: -90 }}
      animate={{ x: 0, opacity: 1, rotateY: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="relative"
    >
      <motion.div
        className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-white/20 p-2.5 sm:p-3 md:p-4 relative overflow-hidden"
        whileHover={{
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Finish Line */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-2 bg-linear-to-b from-yellow-400 via-white to-yellow-400"
          animate={
            isRacing
              ? {
                  opacity: [1, 0.6, 1],
                  boxShadow: [
                    "0 0 10px rgba(250, 204, 21, 0.5)",
                    "0 0 20px rgba(250, 204, 21, 0.8)",
                    "0 0 10px rgba(250, 204, 21, 0.5)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: isRacing ? Infinity : 0,
          }}
        />

        {/* Track Lines */}
        <div className="absolute inset-0 flex justify-around px-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-0.5 bg-gray-300 dark:bg-white/10"></div>
          ))}
        </div>

        {/* Lane Header */}
        <div className="relative flex items-center mb-1.5 sm:mb-2">
          <div
            className={`bg-linear-to-r ${racer.color} px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-bold text-xs sm:text-sm mr-1.5 sm:mr-2`}
          >
            #{index + 1}
          </div>
          {racer.emoji &&
            (racer.emoji.startsWith("/emojis/") ||
              racer.emoji.startsWith("data:image/")) && (
              <div className="hidden sm:block font-semibold text-gray-900 dark:text-white mr-2 capitalize text-sm md:text-base">
                {getEmojiName(racer.emoji)}:
              </div>
            )}
          <div className="font-semibold text-gray-900 dark:text-white truncate flex-1 text-xs sm:text-sm md:text-base">
            {racer.name}
          </div>
        </div>

        {/* Race Track */}
        <div className="relative h-12 sm:h-14 md:h-16 bg-gray-100 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Speed Lines */}
          {isRacing && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`speed-line-${i}`}
                  className="absolute h-0.5 bg-gray-300 dark:bg-white/20"
                  style={{
                    top: `${10 + i * 10}%`,
                    width: `${20 + Math.random() * 30}px`,
                  }}
                  animate={{
                    x: ["100%", "-100%"],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Racer */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-10"
            initial={{ left: "0%" }}
            animate={{
              left: isRacing ? "95%" : "0%",
            }}
            transition={{
              duration: isRacing ? racer.duration : 0,
              ease: [0.43, 0.13, 0.23, 0.96],
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          >
            <motion.div
              className="relative"
              animate={{
                scale: isRacing ? [1, 1.2, 0.9, 1.15, 0.95, 1.1, 1] : 1,
                rotate: isRacing ? [0, -5, 5, -3, 3, 0] : 0,
              }}
              transition={{
                duration: 0.8,
                repeat: isRacing ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl"
                animate={
                  isRacing
                    ? {
                        filter: [
                          "drop-shadow(0 0 0px rgba(255,255,255,0))",
                          "drop-shadow(0 0 8px rgba(255,200,0,0.8))",
                          "drop-shadow(0 0 0px rgba(255,255,255,0))",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: isRacing ? Infinity : 0,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                {racer.emoji.startsWith("data:image/") ||
                racer.emoji.startsWith("/") ? (
                  <img
                    src={racer.emoji}
                    alt={racer.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl md:text-4xl">
                    {racer.emoji}
                  </span>
                )}
              </motion.div>

              {/* Speed Trail */}
              {isRacing && (
                <motion.div
                  className="absolute right-full top-1/2 -translate-y-1/2 flex gap-1 mr-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-${2 + i} h-1 bg-linear-to-r ${racer.color} rounded-full`}
                      animate={{
                        opacity: [0.9, 0.3, 0.9],
                        scaleX: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 0.4 + i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {/* Particles */}
              {isRacing && (
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`spark-${i}`}
                      className={`absolute w-1 h-1 bg-${
                        ["yellow", "orange", "red"][i]
                      }-400 rounded-full`}
                      style={{
                        right: `${10 + i * 5}px`,
                        top: `${-5 + i * 3}px`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: [-10, -30],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full bg-linear-to-r ${racer.color} relative`}
            initial={{ width: "0%" }}
            animate={{
              width: isRacing ? "100%" : "0%",
            }}
            transition={{
              duration: isRacing ? racer.duration : 0,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            {isRacing && (
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
