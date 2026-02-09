"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function IncrementsPage() {
    return (
        <section className="w-full h-dvh bg-[#1A1A1A] text-[#F5F5F0] overflow-y-auto md:overflow-hidden no-scrollbar relative">

            <div className="w-full min-h-full md:h-full max-w-[1600px] mx-auto px-6 md:px-12 pt-20 pb-12 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="relative w-full h-[50vh] md:h-[85vh] flex justify-start items-center"
                >
                    <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                        <Image
                            src="/assets/images/hero-1.jpg"
                            alt="Increments Agency"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </motion.div>

                <div className="flex flex-col justify-start md:justify-center items-start h-full">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="max-w-xl space-y-6 md:space-y-8"
                    >
                        <p className="font-sans font-bold text-xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight">
                            Increments is a creative practice dedicated to the art of refinement.
                            We specialize in finding vulnerability in visual direction, styling, and brand identity,
                            believing that significant impact is the result of small,
                            deliberate, and continuous improvements.
                        </p>

                        <div className="pt-1 md:pt-2">
                            <motion.a
                                href="https://instagram.com/in.crements"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.2 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="block font-sans font-bold text-lg md:text-xl tracking-tight cursor-pointer"
                            >
                                @in.crements
                            </motion.a>
                        </div>
                    </motion.div>

                </div>

            </div>

            <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("/assets/noise.png")' }}
            />

        </section>
    );
}