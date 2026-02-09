"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [startExit, setStartExit] = useState(false);
    const [translateY, setTranslateY] = useState(-300);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    useEffect(() => {
        setTranslateY(-(window.innerHeight / 2 - 40));
    }, []);
    useEffect(() => {
        const duration = 800;
        const steps = 100;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(timer);
                    setTimeout(() => setStartExit(true), 400);
                    return 100;
                }
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (startExit) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                onComplete();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [startExit, onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center pointer-events-none">

                    <motion.div
                        className="absolute inset-0 bg-[#F5F5F0]"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: startExit ? 0 : 1 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            delay: startExit ? 0.2 : 0
                        }}
                    />

                    <motion.div
                        className="relative z-20 w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 items-center"
                        initial={{ y: 0 }}
                        animate={{
                            y: startExit ? translateY : 0,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.83, 0, 0.17, 1],
                        }}
                    >
                        <div className="text-left col-span-1 md:col-span-1">
                            <motion.span
                                className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] block"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: startExit ? 0 : 1 }}
                                transition={{ duration: 0.1, delay: startExit ? 0.4 : 0 }}
                            >
                                Jason Okoh
                            </motion.span>
                        </div>

                        <motion.div
                            className="hidden md:block text-center col-span-3"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: startExit ? 0 : 1 }}
                            transition={{ duration: 0.2, delay: startExit ? 0.3 : 0 }}
                        >
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] tabular-nums">
                                {count} — 100
                            </span>
                        </motion.div>

                        <motion.div
                            className="text-right col-span-1 md:col-span-1"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: startExit ? 0 : 1 }}
                            transition={{ duration: 0.2, delay: startExit ? 0.3 : 0 }}
                        >
                            <span className="md:hidden text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] tabular-nums">
                                {count} — 100
                            </span>
                            <span className="hidden md:block text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                                Stylist & Director
                            </span>
                        </motion.div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}