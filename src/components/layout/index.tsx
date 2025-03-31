import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import AppMain from "./app-main";

export default function AppLayout() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [open, setOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleDrawer = () => setOpen((prev) => !prev);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppHeader
          onToggle={toggleDrawer}
          themeToggle={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <AppSidebar open={open} />
        <AppMain>
          <Outlet />
        </AppMain>
      </Box>
    </ThemeProvider>
  );
}
