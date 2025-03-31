import {
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

export default function ConfluenceList({
  pages,
  selectedId,
  onSelect,
  loading,
}: {
  pages: { id: string; title: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <List dense>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="rectangular"
            height={40}
            animation="wave"
            sx={{ mb: 1, borderRadius: 1 }}
          />
        ))}
      </List>
    );
  }

  if (pages.length === 0) {
    return (
      <Typography sx={{ px: 2, py: 1, color: "text.secondary" }}>
        문서가 없습니다.
      </Typography>
    );
  }

  return (
    <List dense>
      {pages.map((page) => (
        <ListItemButton
          key={`${page.id}-${page.title}`}
          onClick={() => onSelect(page.id)}
          selected={selectedId === page.id}
        >
          <ListItemText primary={page.title} />
        </ListItemButton>
      ))}
    </List>
  );
}
