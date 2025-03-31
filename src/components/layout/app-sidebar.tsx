import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Collapse,
  useTheme,
  Skeleton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { routeConfig } from "../../routes/route-config";
import { useEffect, useState } from "react";
import { fetchConfluenceSearch } from "../../apis/confluence/api";
import { IConfluenceSearchResult } from "../../intefaces/info.interface";
import { formatTitle } from "../../utils/common";

const drawerWidth = 260;

interface Props {
  open: boolean;
}

export default function AppSidebar({ open }: Props) {
  const theme = useTheme();
  const location = useLocation();
  const [pagesPending, setPagesPending] = useState(true);
  const [pages, setPages] = useState<IConfluenceSearchResult[]>([]);
  const [projectsOpen, setProjectsOpen] = useState(true);

  useEffect(() => {
    setPagesPending(true);
    fetchConfluenceSearch("frontend service")
      .then((data) => {
        const results = data.results ?? [];
        const filterResults = results?.filter(
          (v: { type: string }) => v.type !== "folder"
        );
        const pageList = filterResults.map(
          (item: { id: string; title?: string }) => ({
            id: item.id,
            title: item.title,
          })
        );
        setPages(pageList);
      })
      .catch((err) => {
        console.error("검색 실패:", err);
      })
      .finally(() => {
        setPagesPending(false);
      });
  }, []);

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        },
      }}
    >
      <Toolbar />
      <List>
        {pagesPending ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              height={40}
              animation="wave"
              sx={{ borderRadius: 1, m: 2 }}
            />
          ))
        ) : (
          <>
            {routeConfig.map(({ path, label, children }) => {
              const isProjects = path === "/projects";

              return (
                <Box key={path}>
                  <ListItemButton
                    onClick={() =>
                      isProjects ? setProjectsOpen((prev) => !prev) : null
                    }
                    component={isProjects ? "button" : Link}
                    to={!isProjects ? path || "" : undefined}
                    selected={location.pathname === path}
                    disabled={!path}
                    sx={{
                      width: "100%",
                      ...(location.pathname === path && {
                        bgcolor: "action.selected",
                        "&:hover": { bgcolor: "action.selected" },
                      }),
                    }}
                  >
                    <ListItemText
                      primary={label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontWeight: "bold",
                          },
                        },
                      }}
                    />
                    {isProjects &&
                      (projectsOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>

                  {/* children: projects 하위 목록 */}
                  {isProjects && (
                    <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {children &&
                          pages.map((project) => {
                            const projectPath = `/projects/${project.id}`;
                            return (
                              <ListItemButton
                                key={project.title}
                                component={Link}
                                to={`${projectPath}?title=${formatTitle(
                                  project.title
                                )}`}
                                selected={location.pathname === projectPath}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  width: "100%",
                                  pl: 4,
                                  ...(location.pathname === projectPath && {
                                    bgcolor: "action.selected",
                                    "&:hover": { bgcolor: "action.selected" },
                                  }),
                                }}
                              >
                                <Box>✅</Box>
                                <ListItemText
                                  primary={formatTitle(project.title)}
                                  slotProps={{
                                    primary: {
                                      sx: {
                                        fontSize: "14px",
                                      },
                                    },
                                  }}
                                />
                              </ListItemButton>
                            );
                          })}
                      </List>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </>
        )}
      </List>
    </Drawer>
  );
}
