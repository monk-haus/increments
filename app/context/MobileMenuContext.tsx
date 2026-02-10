"use client";

import { createContext, useContext, useState } from "react";

interface MobileMenuContextType {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

const MobileMenuContext = createContext<MobileMenuContextType>({
    mobileMenuOpen: false,
    setMobileMenuOpen: () => { },
});

export const useMobileMenu = () => useContext(MobileMenuContext);

export const MobileMenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <MobileMenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
            {children}
        </MobileMenuContext.Provider>
    );
};