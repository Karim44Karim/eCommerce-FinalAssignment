"use client";

import React, { useEffect, useState } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const calculateTimeLeft = () => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();

    if (isNaN(target)) {
      // If invalid date string
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = target - now;
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-lg font-bold">
      <span className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center flex-col p-5">
        <div>{timeLeft.days}</div>
        <div className="text-xs font-normal">Days</div>
      </span>
      <span className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center flex-col p-5">
        <div>{timeLeft.hours}</div>
        <div className="text-xs font-normal">Hours</div>
      </span>
      <span className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center flex-col p-5">
        <div>{timeLeft.minutes}</div>
        <div className="text-xs font-normal">Minutes</div>
      </span>
      <span className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center flex-col p-5">
        <div>{timeLeft.seconds}</div>
        <div className="text-xs font-normal">Seconds</div>
      </span>
    </div>
  );
}
