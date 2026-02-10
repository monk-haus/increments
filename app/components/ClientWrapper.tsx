"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import Header from "./Header";
import { LoadingProvider, useLoading } from "../context/LoadingContext";
import { MobileMenuProvider, useMobileMenu } from "../context/MobileMenuContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

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

// Stagger for mobile menu nav links
const linkContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.3,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

const linkItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

function Content({ children }: { children: React.ReactNode }) {
    const { setPreloaderComplete, preloaderComplete } = useLoading();
    const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
    const [mobileWorkView, setMobileWorkView] = useState(false);
    const stylingClickedRef = useRef(false);
    const pathname = usePathname();

    const isHomepage = pathname === "/";
    const isDarkPage = pathname === "/increments";
    const mobileHeaderBg = (mobileMenuOpen || mobileWorkView) ? "bg-[#F5F5F0]" : isDarkPage ? "bg-[#1A1A1A]" : "bg-[#F5F5F0]";
    const mobileHeaderText = (mobileMenuOpen || mobileWorkView) ? "text-[#1A1A1A]" : isDarkPage ? "text-[#F5F5F0]" : "text-[#1A1A1A]";

    const MENU_HEIGHT = "50dvh";

    // Reset work view when menu closes — but NOT if we're transitioning to work view
    useEffect(() => {
        if (!mobileMenuOpen && !stylingClickedRef.current) {
            const timer = setTimeout(() => setMobileWorkView(false), 500);
            return () => clearTimeout(timer);
        }
        if (!mobileMenuOpen) {
            stylingClickedRef.current = false;
        }
    }, [mobileMenuOpen]);

    // When Styling is tapped: close menu, show work view
    const handleStylingClick = () => {
        stylingClickedRef.current = true;
        setMobileMenuOpen(false);
        setTimeout(() => setMobileWorkView(true), 100);
    };

    // Header button logic
    const handleHeaderButtonClick = () => {
        if (mobileWorkView) {
            setMobileWorkView(false);
        } else if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        } else {
            setMobileMenuOpen(true);
        }
    };

    const headerButtonLabel = mobileWorkView
        ? "Close"
        : mobileMenuOpen
            ? "Close"
            : "Menu";

    // Check if a nav link is the active page
    const isActivePage = (href: string) => pathname === href;

    return (
        <>
            <Preloader onComplete={() => setPreloaderComplete(true)} />

            {/* ============================================================
                MOBILE LAYOUT
            ============================================================ */}
            <motion.div
                className={`md:hidden ${isDarkPage ? "bg-[#1A1A1A]" : "bg-[#F5F5F0]"}`}
                animate={{ y: mobileMenuOpen ? 0 : `-${MENU_HEIGHT}` }}
                initial={{ y: `-${MENU_HEIGHT}` }}
                transition={{
                    duration: 0.6,
                    ease: [0.76, 0, 0.24, 1],
                }}
            >
                {/* ---- NAV LINKS PANEL (above the fold when closed) ---- */}
                <div
                    className={`w-full flex flex-col justify-between px-10 pb-8 ${mobileMenuOpen ? "bg-[#F5F5F0]" : mobileHeaderBg}`}
                    style={{ height: MENU_HEIGHT }}
                >
                    <AnimatePresence mode="wait">
                        {mobileMenuOpen && (
                            <motion.div
                                key="mobile-nav"
                                variants={linkContainerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col gap-0.5 pt-10"
                            >
                                {/* Name — greyed out only on homepage (active indicator) */}
                                <motion.span
                                    variants={linkItemVariants}
                                    className={`font-serif text-[26px] font-light leading-tight tracking-wide mb-1 ${isHomepage
                                        ? "text-[#1A1A1A]/30"
                                        : "text-[#1A1A1A]"
                                        }`}
                                >
                                    Jason Okoh
                                </motion.span>

                                {navLinks.map((link) => {
                                    const isActive = isActivePage(link.href);

                                    return (
                                        <motion.div key={link.name} variants={linkItemVariants}>
                                            {link.isDropdown ? (
                                                <button
                                                    onClick={handleStylingClick}
                                                    className={`font-serif text-[26px] font-semibold leading-snug tracking-wide hover:text-[#8B3A2F] transition-colors duration-300 text-left ${isActive
                                                        ? "text-[#1A1A1A]/30"
                                                        : "text-[#1A1A1A]"
                                                        }`}
                                                >
                                                    {link.name}
                                                </button>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`font-serif text-[26px] font-semibold leading-snug tracking-wide hover:text-[#8B3A2F] transition-colors duration-300 block ${isActive
                                                        ? "text-[#1A1A1A]/30"
                                                        : "text-[#1A1A1A]"
                                                        }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Invisible spacer */}
                    <div className="flex justify-between items-center invisible">
                        <span className="text-[9px] font-bold uppercase tracking-widest">Jason Okoh</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest">Close</span>
                    </div>
                </div>

                {/* ---- MOBILE HEADER BAR ---- */}
                <div className={`w-full px-10 py-8 flex justify-between items-center relative z-20 transition-colors duration-300 ${mobileHeaderBg}`}>
                    <Link href="/" className="group" onClick={() => { setMobileWorkView(false); setMobileMenuOpen(false); }}>
                        <motion.span
                            className={`text-[9px] font-bold uppercase tracking-widest group-hover:text-[#8B3A2F] transition-colors block ${mobileHeaderText}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Jason Okoh
                        </motion.span>
                    </Link>
                    <motion.button
                        onClick={handleHeaderButtonClick}
                        className="focus:outline-none group"
                        initial={{ opacity: 0, y: -10 }}
                        animate={preloaderComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className={`text-[9px] font-bold uppercase tracking-widest group-hover:text-[#8B3A2F] transition-colors ${mobileHeaderText}`}>
                            {headerButtonLabel}
                        </span>
                    </motion.button>
                </div>

                {/* ---- PAGE CONTENT with work overlay ---- */}
                <div
                    className={`relative transition-opacity duration-700 ${!preloaderComplete
                        ? "h-screen overflow-hidden opacity-0 pointer-events-none"
                        : "opacity-100"
                        }`}
                >
                    {/* Work/Projects overlay */}
                    <AnimatePresence>
                        {mobileWorkView && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute inset-0 z-20 bg-[#F5F5F0]/90 backdrop-blur-sm"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                    className="px-10 pt-4 pb-12 flex flex-col gap-3 overflow-y-auto h-full no-scrollbar"
                                >
                                    {recentWork.map((project, i) => (
                                        <Link
                                            key={i}
                                            href="#"
                                            onClick={() => setMobileWorkView(false)}
                                            className="text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#8B3A2F] transition-colors"
                                        >
                                            {project.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {children}
                </div>
            </motion.div>

            {/* ============================================================
                DESKTOP LAYOUT (unchanged)
            ============================================================ */}
            <div className="hidden md:block">
                <Header />

                <div
                    className={`transition-opacity duration-700 ${!preloaderComplete
                        ? "h-screen overflow-hidden opacity-0 pointer-events-none"
                        : "opacity-100"
                        }`}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <MobileMenuProvider>
                <Content>{children}</Content>
            </MobileMenuProvider>
        </LoadingProvider>
    );
}