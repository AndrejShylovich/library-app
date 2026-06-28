import { DarkMode, LightMode } from "@mui/icons-material";

import { Button } from "@/shared/ui/Button/Button";
import { useThemeToggle } from "./useThemeToggle";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <Button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      title={`Current theme: ${theme}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <LightMode fontSize="medium" />
      ) : (
        <DarkMode fontSize="medium" />
      )}
    </Button>
  );
};