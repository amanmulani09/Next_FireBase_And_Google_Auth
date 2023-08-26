'use client'
import { useState, useEffect, useRef } from "react";

const useIdle = (delay: number) => {
  const [isIdle, setIsIdle] = useState(false);

  const timeoutId = useRef<string | null>(null);

  const goInActive = () => {
    setIsIdle(true);
  };

  const startTimer = () => {
    timeoutId.current = setTimeout(() => {
      goInActive();
    }, delay);
  };

  const goActive = () => {
    setIsIdle(false);
    startTimer();
  };

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    goActive();
  };

  const setUp = () => {
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("wheel", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("touchmove", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("keydown", resetTimer);
  };

  const cleanUp = () => {
    document.removeEventListener("mousedown", resetTimer);
    document.removeEventListener("wheel", resetTimer);
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("touchmove", resetTimer);
    document.removeEventListener("keypress", resetTimer);
    document.removeEventListener("keydown", resetTimer);

    //for memory leak
    clearTimeout(timeoutId.current);
  };

  useEffect(() => {
    setUp();
    return () => {
      cleanUp();
    };
  });
  return isIdle;
};
export default useIdle;
