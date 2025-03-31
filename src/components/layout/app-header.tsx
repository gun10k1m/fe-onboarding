import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function AppHeader({
  onToggle,
  themeToggle,
  isDarkMode,
}: {
  onToggle: () => void;
  themeToggle: () => void;
  isDarkMode: boolean;
}) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
      color="inherit"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={onToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            일만백만 프론트엔드 온보딩 집합소
          </Typography>
        </Box>

        <Box>
          <IconButton
            component="a"
            href="https://github.com/10k1m-dev"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>

          <IconButton onClick={themeToggle} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
