"use client"

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeProvider = ({ children }) => {

    const { theme } = useContext(ThemeContext);
    // for this Warning: 
    // Prop `className` did not match. Server: "null" Client: "dark"
    // I think it's because component is not ready
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;
    return <div className={theme}>{children} </div>
};

export default ThemeProvider;
