"use client";

import Image from "next/image";

interface ProjectProps {
    id: number;
    client: string;
    title: string;
    src: string;
    year: string;
    index: number;
    total: number;
}

export default function ProjectItem({ client, title, src, index, total }: ProjectProps) {
    return (
        <section className="relative w-full h-dvh snap-start bg-[#F5F5F0] overflow-hidden">

            <div className="w-full h-full max-w-[1920px] mx-auto px-0 md:px-20 grid grid-cols-1 md:grid-cols-[65%_35%] items-center">

                <div className="w-full h-[70vh] md:h-full flex flex-col justify-center items-center md:items-start pb-0">

                    <div className="relative w-full h-full md:h-[90vh] flex justify-center md:justify-start items-center">
                        <Image
                            src={src}
                            alt={title}
                            width={1600}
                            height={2000}
                            className="w-auto h-full max-w-full object-contain object-center md:object-left"
                            priority={index === 0}
                        />
                    </div>
                </div>

                <div className="w-full h-[30vh] md:h-full flex flex-col justify-start md:justify-center items-start md:items-center pt-4 md:pt-0 px-10 md:px-0 md:pl-12">

                    <div className="flex flex-col gap-2 md:gap-4 text-left md:text-center">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-bold block">
                            View Case
                        </span>

                        <h2 className="text-[11px] md:text-[12px] font-bold text-[#1A1A1A] uppercase tracking-widest leading-relaxed">
                            {title} <br className="hidden md:block" />
                            <span className="font-normal text-[#1A1A1A]/50 md:px-1">for</span> {client}
                        </h2>
                    </div>

                </div>

            </div>

            <div className="absolute bottom-8 right-10 md:bottom-12 md:right-20 z-20">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/30 tabular-nums">
                    {index + 1} — {total}
                </span>
            </div>

        </section>
    );
}