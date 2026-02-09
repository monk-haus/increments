"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

const navLinks = [
    { name: "Styling", href: "/styling", isDropdown: true },
    { name: "Expertise", href: "/expertise" },
    { name: "Increments", href: "/increments" },
    { name: "Inquiry", href: "/contact" },
];

const recentWork = [
    { name: "Project Title", src: "/assets/images/hero-1.jpg" },
    { name: "Project Title", src: "/assets/images/hero-2.jpg" },
    { name: "Project Title", src: "/assets/images/hero-3.jpg" },
    { name: "Project Title", src: "/assets/images/hero-4.jpg" },
    { name: "Project Title", src: "/assets/images/hero-5.jpg" },
    { name: "Project Title", src: "/assets/images/hero-6.jpg" },
    { name: "Project Title", src: "/assets/images/hero-2.jpg" },
    { name: "Project Title", src: "/assets/images/hero-3.jpg" },
    { name: "Project Title", src: "/assets/images/hero-4.jpg" },
    { name: "Project Title", src: "/assets/images/hero-5.jpg" },
];

export default function Header() {
    const { preloaderComplete } = useLoading();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileWorkView, setMobileWorkView] = useState(false);
    const [desktopWorkOpen, setDesktopWorkOpen] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const isDarkPage = pathname === "/increments";
    const textColor = (desktopWorkOpen || isOpen)
        ? "text-[#1A1A1A]"
        : isDarkPage
            ? "text-[#F5F5F0]"
            : "text-[#1A1A1A]";

    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setMobileWorkView(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleToggleClick = () => {
        if (isOpen) {
            if (mobileWorkView) setMobileWorkView(false);
            else setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const menuVariants = {
        closed: { opacity: 0, y: "-100%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        open: { opacity: 1, y: "0%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    };

    const contentVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
    };

    const dropdownVariants = {
        closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    const headerItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            },
        },
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-10 py-8 md:px-20 md:py-10 box-border bg-transparent">

                <div className="w-full max-w-[1920px] mx-auto hidden md:grid grid-cols-5 items-start">
                    <div className="text-left z-50">
                        <Link href="/" className="group inline-block" onClick={() => setDesktopWorkOpen(false)}>
                            <motion.span
                                className={`text-[11px] font-bold uppercase tracking-widest hover:text-[#8B3A2F] transition-colors block ${textColor}`}
                                variants={headerItemVariants}
                                initial="hidden"
                                animate={preloaderComplete ? "visible" : "hidden"}
                            >
                                Jason Okoh
                            </motion.span>
                        </Link>
                    </div>

                    {navLinks.slice(0, 3).map((link) => (
                        <div key={link.name} className="text-center z-50">
                            {link.isDropdown ? (
                                <motion.button
                                    onClick={() => setDesktopWorkOpen(!desktopWorkOpen)}
                                    className="group inline-block relative overflow-hidden cursor-pointer focus:outline-none"
                                    variants={headerItemVariants}
                                    initial="hidden"
                                    animate={preloaderComplete ? "visible" : "hidden"}
                                >
                                    <span className={`text-[11px] font-bold uppercase tracking-widest block transition-transform duration-300 group-hover:-translate-y-full ${desktopWorkOpen ? 'text-[#8B3A2F]' : textColor}`}>
                                        {link.name}
                                    </span>
                                    <span className="absolute top-0 left-0 w-full text-[11px] font-bold uppercase tracking-widest text-[#8B3A2F] block transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                                        {link.name}
                                    </span>
                                </motion.button>
                            ) : (
                                <motion.div
                                    variants={headerItemVariants}
                                    initial="hidden"
                                    animate={preloaderComplete ? "visible" : "hidden"}
                                >
                                    <Link href={link.href} className="group inline-block relative overflow-hidden">
                                        <span className={`text-[11px] font-bold uppercase tracking-widest block transition-transform duration-300 group-hover:-translate-y-full ${textColor}`}>
                                            {link.name}
                                        </span>
                                        <span className="absolute top-0 left-0 w-full text-[11px] font-bold uppercase tracking-widest text-[#8B3A2F] block transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                                            {link.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    ))}

                    <div className="text-right z-50">
                        <motion.div
                            variants={headerItemVariants}
                            initial="hidden"
                            animate={preloaderComplete ? "visible" : "hidden"}
                        >
                            <Link href={navLinks[3].href} className="group inline-block relative overflow-hidden">
                                <span className={`text-[11px] font-bold uppercase tracking-widest block transition-transform duration-300 group-hover:-translate-y-full ${textColor}`}>
                                    {navLinks[3].name}
                                </span>
                                <span className="absolute top-0 left-0 w-full text-[11px] font-bold uppercase tracking-widest text-[#8B3A2F] block transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                                    {navLinks[3].name}
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence>
                    {desktopWorkOpen && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 left-0 w-full h-screen bg-[#F5F5F0]/95 backdrop-blur-sm z-40 pt-[60px] px-20 hidden md:block overflow-hidden"
                        >
                            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-5 h-full">
                                <div className="col-span-1 relative h-[300px] md:h-[400px] w-full mt-2">
                                    <AnimatePresence mode="wait">
                                        {hoveredProject !== null && (
                                            <motion.div
                                                key={hoveredProject}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0 w-full h-full"
                                            >
                                                <Image
                                                    src={recentWork[hoveredProject].src}
                                                    alt="Project Preview"
                                                    fill
                                                    className="object-cover object-center grayscale opacity-90"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="col-span-1 flex flex-col items-start pl-[calc(50%-26px)]">
                                    <div className="flex flex-col gap-1 text-left max-h-[70vh] overflow-y-auto no-scrollbar w-full">
                                        {recentWork.map((project, index) => (
                                            <Link
                                                key={index}
                                                href="#"
                                                onMouseEnter={() => setHoveredProject(index)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                                className="group cursor-pointer transition-all duration-300"
                                                style={{ opacity: hoveredProject !== null && hoveredProject !== index ? 0.3 : 1 }}
                                            >
                                                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:text-[#8B3A2F] text-[#1A1A1A] transition-colors block py-0.5">
                                                    {project.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-3 h-full cursor-default" onClick={() => setDesktopWorkOpen(false)} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center md:hidden relative z-50">
                    <Link href="/" className="group" onClick={() => setIsOpen(false)}>
                        <motion.span
                            className={`text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-[#8B3A2F] block ${textColor}`}
                            variants={headerItemVariants}
                            initial="hidden"
                            animate={preloaderComplete ? "visible" : "hidden"}
                        >
                            Jason Okoh
                        </motion.span>
                    </Link>

                    <motion.button
                        onClick={handleToggleClick}
                        className="focus:outline-none group"
                        variants={headerItemVariants}
                        initial="hidden"
                        animate={preloaderComplete ? "visible" : "hidden"}
                    >
                        <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-[#8B3A2F] ${textColor}`}>
                            {isOpen && mobileWorkView ? "Menu" : isOpen ? "Close" : "Menu"}
                        </span>
                    </motion.button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 bg-[#F5F5F0]/95 backdrop-blur-sm text-[#1A1A1A] z-40 flex flex-col"
                    >
                        <AnimatePresence mode="wait">
                            {!mobileWorkView ? (
                                <motion.div
                                    key="main-menu"
                                    variants={contentVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex flex-col gap-8 text-center items-center justify-center h-full px-6"
                                >
                                    {navLinks.map((link) => (
                                        <div key={link.name}>
                                            {link.isDropdown ? (
                                                <button
                                                    onClick={() => setMobileWorkView(true)}
                                                    className="text-3xl font-bold uppercase tracking-widest hover:text-[#8B3A2F] transition-colors duration-300 text-[#1A1A1A]"
                                                >
                                                    {link.name}
                                                </button>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-3xl font-bold uppercase tracking-widest hover:text-[#8B3A2F] transition-colors duration-300 text-[#1A1A1A]"
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="work-list"
                                    variants={contentVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex flex-col items-start w-full h-full pt-[72px] px-6"
                                >
                                    <div className="flex flex-col gap-3 text-left overflow-y-auto w-full no-scrollbar pb-12">
                                        {recentWork.map((project, i) => (
                                            <Link
                                                key={i}
                                                href="#"
                                                onClick={() => setIsOpen(false)}
                                                className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#8B3A2F] transition-colors"
                                            >
                                                {project.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}