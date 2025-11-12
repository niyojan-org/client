"use client";

import { createContext, useContext, useEffect, useState } from "react";
import GlobalLoader from "./GlobalLoader";
import { useLoaderStore } from "@/store/loaderStore"; // adjust path

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const { isLoading, showLoader, hideLoader } = useLoaderStore();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/loader/Spin-loader.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load Lottie JSON", err));
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {isLoading && animationData && (
        <GlobalLoader animationData={animationData} />
      )}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider...alok");
  }
  return context;
}
