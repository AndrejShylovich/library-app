import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme,
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light",
    );
  };

  return {
    theme,
    toggleTheme,
  };
};