import { motion } from "motion/react";

interface RaceInstructionsProps {
  show: boolean;
  racersCount: number;
}

export default function RaceInstructions({
  show,
  racersCount,
}: RaceInstructionsProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: racersCount * 0.1 + 0.3,
        type: "spring",
        stiffness: 100,
      }}
      className="mt-12 text-center"
    >
      <motion.div
        className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto relative overflow-hidden shadow-lg"
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(59, 130, 246, 0.5)",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-blue-100 dark:via-blue-900/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white relative z-10">
          How does it work?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 relative z-10">
          Click "Start Race" and watch the restaurants compete! The winner will
          be where you'll have lunch today! 🍽️
        </p>
      </motion.div>
    </motion.div>
  );
}
