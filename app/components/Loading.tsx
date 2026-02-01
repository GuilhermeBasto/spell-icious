/**
 * Loading Component
 * Beautiful loading animation for the app
 */

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "A carregar..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Spinning plates */}
        <div className="flex gap-2 items-end">
          <div
            className="text-5xl animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          >
            🍽️
          </div>
          <div
            className="text-5xl animate-bounce"
            style={{ animationDelay: "200ms", animationDuration: "1s" }}
          >
            🍕
          </div>
          <div
            className="text-5xl animate-bounce"
            style={{ animationDelay: "400ms", animationDuration: "1s" }}
          >
            🍔
          </div>
        </div>
      </div>

      {message && (
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
