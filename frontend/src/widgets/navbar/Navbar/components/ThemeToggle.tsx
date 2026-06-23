import { useEffect, useState } from "react";
import { Button } from "../../../../shared/ui/Button/Button";
import { DarkMode, LightMode } from "@mui/icons-material";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");

    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      className="theme-toggle-btn"
      onClick={toggle}
      title={`Текущая тема: ${theme}`}
      aria-label="Переключить тему"
    >
      {theme === "dark" ? (
        <LightMode fontSize="medium" />
      ) : (
        <DarkMode fontSize="medium" />
      )}
    </Button>
  );
};
