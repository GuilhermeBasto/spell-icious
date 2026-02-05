import { motion } from "motion/react";

interface RaceHeaderProps {
  onBack: () => void;
}

export default function RaceHeader({ onBack }: RaceHeaderProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-3 sm:px-4 py-4 sm:py-6"
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
        <motion.button
          onClick={onBack}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-colors border border-gray-200 dark:border-gray-700 relative overflow-hidden group shadow-sm text-sm sm:text-base"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.span
            className="absolute inset-0 bg-linear-to-r from-transparent via-gray-100 dark:via-gray-700 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative text-gray-700 dark:text-gray-200">
            ← Back
          </span>
        </motion.button>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center flex-1 text-orange-600 dark:text-orange-500"
        >
          🪄 Spell-icious 🏁
        </motion.h1>
        <div className="w-12 sm:w-16 md:w-20"></div>
      </div>
    </motion.div>
  );
}
