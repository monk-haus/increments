"use client";

import { createContext, useContext, useState } from "react";

interface LoadingContextType {
    preloaderComplete: boolean;
    setPreloaderComplete: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    preloaderComplete: false,
    setPreloaderComplete: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [preloaderComplete, setPreloaderComplete] = useState(false);

    return (
        <LoadingContext.Provider value={{ preloaderComplete, setPreloaderComplete }}>
            {children}
        </LoadingContext.Provider>
    );
};