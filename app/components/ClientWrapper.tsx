"use client";

import Preloader from "./Preloader";
import Header from "./Header";
import { LoadingProvider, useLoading } from "../context/LoadingContext";

function Content({ children }: { children: React.ReactNode }) {
    const { setPreloaderComplete, preloaderComplete } = useLoading();

    return (
        <>
            <Preloader onComplete={() => setPreloaderComplete(true)} />
            <Header />

            <div
                className={`transition-opacity duration-700 ${!preloaderComplete
                    ? "h-screen overflow-hidden opacity-0 pointer-events-none"
                    : "opacity-100"
                    }`}
            >
                {children}
            </div>
        </>
    );
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <Content>{children}</Content>
        </LoadingProvider>
    );
}