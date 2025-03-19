"use client";
import {
    MoonIcon,
    SunIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

const ThemeSwitcher = React.forwardRef<
    HTMLButtonElement,
    React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
    const { className, ...rest } = props;

    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (

        <button
            ref={ref}
            {...rest}
            className={cn(
                " bg-accent/50 hover:bg-accent border hover:text-accent-foreground  relative flex size-8 items-center justify-center overflow-hidden rounded-lg  p-2 transition-colors ",
                className,
            )}
            onClick={toggleTheme}
        >
            <motion.span
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%, -190%)", // This can serve as the initial transform
                }}
                initial={{
                    transform: "translate(-50%, 190%)",
                }}
                animate={{
                    ...(theme === "dark"
                        ? { transform: "translate(-50%, 150%)" }
                        : { transform: "translate(-50%, 0%)" }),
                }}
            >
                <SunIcon className="size-4" />
            </motion.span>
            <motion.span
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%, -190%)", // This can serve as the initial transform
                }}
                initial={{ transform: "translate(-50%, -190%)" }}
                animate={{
                    transform: theme === "dark" ? "translate(-50%, 0%)" : "translate(-50%, -150%)",
                }}
            >
                <MoonIcon style={{ fontSize: "1rem" }} /> {/* equivalent to "size-4" */}
            </motion.span>
        </button>
    );
});
ThemeSwitcher.displayName = "ThemeSwitcher";

export { ThemeSwitcher };
