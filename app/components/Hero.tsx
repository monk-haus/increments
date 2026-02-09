"use client";

import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import ProjectItem from "./ProjectItem";

const projects = [
    {
        id: 1,
        client: "Client Name",
        title: "Project Title",
        src: "/assets/images/hero-1.jpg",
        year: "2025"
    },
    {
        id: 2,
        client: "Client Name",
        title: "Project Title",
        src: "/assets/images/hero-2.jpg",
        year: "2025"
    },
    {
        id: 3,
        client: "Client Name",
        title: "Project Title",
        src: "/assets/images/hero-3.jpg",
        year: "2026"
    },
    {
        id: 4,
        client: "Client Name",
        title: "Project Title",
        src: "/assets/images/hero-4.jpg",
        year: "2025"
    },
    {
        id: 5,
        client: "Client Name",
        title: "Project Title",
        src: "/assets/images/hero-5.jpg",
        year: "2025"
    },
    {
        id: 6,
        client: "Client Name",
        title: "Project Title",
        src: "/assets/images/hero-6.jpg",
        year: "2026"
    },
];

export default function Hero() {
    const { preloaderComplete } = useLoading();

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.0
            }}
            className="w-full h-dvh overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth bg-[#F5F5F0]"
        >
            {projects.map((project, index) => (
                <ProjectItem
                    key={project.id}
                    {...project}
                    index={index}
                    total={projects.length}
                />
            ))}
        </motion.div>
    );
}