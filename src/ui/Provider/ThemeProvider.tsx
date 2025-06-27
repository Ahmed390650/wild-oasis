import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const ThemeContext = createContext<unknown>(null);
type contextTheme = {
  handleToggle: () => void;
  isDarkMode: boolean;
};
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const defaultTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    defaultTheme,
    "isDarkMode"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);
  const handleToggle = () => {
    setIsDarkMode((v) => !v);
  };
  return (
    <ThemeContext.Provider value={{ handleToggle, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context as contextTheme;
};
export { ThemeProvider, useTheme };
