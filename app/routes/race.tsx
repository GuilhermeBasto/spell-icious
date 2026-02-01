import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import type { Route } from "./+types/race";
import { useRestaurants } from "../contexts/RestaurantsAPIContext";
import { GOOGLE_MAPS_URL } from "~/lib/constants";
import {
  RaceHeader,
  CountdownDisplay,
  WinnerBadge,
  WinnerModal,
  RaceLane,
  RaceInstructions,
  ConfettiEffect,
  getRestaurantIcon,
  colors,
  type Racer,
} from "~/components/race";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Spell-icious Race! 🪄🏁" }];
}

export default function Race() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dataParam = searchParams.get("data");
  const restaurantsParam = searchParams.get("restaurants") || "";

  const { selectedRestaurants } = useRestaurants();

  const [racers, setRacers] = useState<Racer[]>([]);
  const [isRacing, setIsRacing] = useState(false);
  const [winner, setWinner] = useState<Racer | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const raceStartedRef = useRef(false);
  const winnerTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let racerData: Array<{ name: string; emoji?: string }> = [];

    if (dataParam) {
      try {
        racerData = JSON.parse(decodeURIComponent(dataParam));
      } catch (e) {
        console.error("Failed to parse race data:", e);
        navigate("/");
        return;
      }
    } else if (restaurantsParam) {
      const restaurantNames = restaurantsParam.split(",").filter(Boolean);
      racerData = restaurantNames.map((name) => ({ name }));
    } else {
      navigate("/");
      return;
    }

    if (racerData.length === 0) {
      navigate("/");
      return;
    }

    const initialRacers: Racer[] = racerData.map((data, index) => {
      const restaurantData = selectedRestaurants.find(
        (r) => r.name === data.name,
      );

      const emoji =
        data.emoji ||
        restaurantData?.customEmoji ||
        getRestaurantIcon(restaurantData?.types);

      return {
        name: data.name,
        position: 0,
        duration: 0,
        color: colors[index % colors.length],
        emoji: emoji,
        restaurant: restaurantData,
      };
    });

    setRacers(initialRacers);
  }, [dataParam, restaurantsParam, navigate, selectedRestaurants]);

  const beginRace = useCallback(() => {
    setShowWinnerModal(false);
    setWinner(null);
    setIsRacing(true);

    if (winnerTimeoutRef.current !== null) {
      clearTimeout(winnerTimeoutRef.current);
    }

    const racersWithDurations = racers.map((racer) => ({
      ...racer,
      duration: Math.random() * 8 + 12,
    }));

    setRacers(racersWithDurations);

    const fastestRacer = racersWithDurations.reduce((fastest, current) =>
      current.duration < fastest.duration ? current : fastest,
    );

    winnerTimeoutRef.current = window.setTimeout(() => {
      setWinner(fastestRacer);
      setShowWinnerModal(true);
      setIsRacing(false);
      winnerTimeoutRef.current = null;
    }, fastestRacer.duration * 1000);
  }, [racers]);

  const startRace = useCallback(() => {
    setCountdown(3);
    raceStartedRef.current = false;
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) {
          clearInterval(countdownInterval);
          return null;
        }
        if (prev === 1) {
          clearInterval(countdownInterval);
          if (!raceStartedRef.current) {
            raceStartedRef.current = true;
            beginRace();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [beginRace]);

  const resetRace = useCallback(() => {
    if (winnerTimeoutRef.current !== null) {
      clearTimeout(winnerTimeoutRef.current);
      winnerTimeoutRef.current = null;
    }

    setShowWinnerModal(false);
    setWinner(null);
    setIsRacing(false);
    setCountdown(null);
    raceStartedRef.current = false;
    setRacers((prev) =>
      prev.map((racer) => ({
        ...racer,
        position: 0,
        duration: 0,
      })),
    );
  }, []);

  const getGoogleMapsUrl = useCallback((restaurant: any) => {
    if (restaurant.lat && restaurant.lng) {
      return `${GOOGLE_MAPS_URL}${restaurant.lat},${restaurant.lng}`;
    }

    const query = encodeURIComponent(
      `${restaurant.name}, ${restaurant.address}`,
    );
    return `${GOOGLE_MAPS_URL}${query}`;
  }, []);

  return (
    <div className="min-h-screen text-gray-900 dark:text-white overflow-hidden">
      <RaceHeader onBack={() => navigate(-1)} />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <CountdownDisplay
            countdown={countdown}
            isRacing={isRacing}
            winner={winner}
            onStartRace={startRace}
          />

          <WinnerBadge
            winner={winner}
            showModal={showWinnerModal}
            onRaceAgain={resetRace}
          />

          <WinnerModal
            winner={winner}
            showModal={showWinnerModal}
            onClose={resetRace}
            getGoogleMapsUrl={getGoogleMapsUrl}
          />

          <div className="space-y-4">
            {racers.map((racer, index) => (
              <RaceLane
                key={index}
                racer={racer}
                index={index}
                isRacing={isRacing}
              />
            ))}
          </div>

          <RaceInstructions
            show={!isRacing && !winner && countdown === null}
            racersCount={racers.length}
          />
        </div>
      </div>

      <ConfettiEffect show={!!winner} />
    </div>
  );
}
