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
        <section className="relative w-full h-dvh snap-start flex flex-col justify-center items-center px-6">

            <div className="relative w-full max-w-[800px] aspect-[4/3] md:aspect-[16/10] shadow-sm">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                />
            </div>

            <div className="absolute bottom-0 left-0 w-full text-center pb-6 z-10">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold block">
                        View
                    </span>
                    <h2 className="text-sm md:text-base font-bold text-[#1A1A1A] tracking-tight leading-none">
                        {title} <span className="font-normal text-[#1A1A1A]/60">for</span> {client}
                    </h2>
                </div>
            </div>

            <div className="hidden md:block absolute bottom-0 right-12 z-10 pb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/30 tabular-nums">
                    {index + 1} / {total}
                </span>
            </div>
        </section>
    );
}