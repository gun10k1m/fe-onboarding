import { List, ListItemButton, ListItemText, Link } from "@mui/material";

type LinkItem = {
  label: string;
  url: string;
};

type Props = {
  items: LinkItem[];
};

export default function LinkList({ items }: Props) {
  return (
    <List dense>
      {items.map((item, i) => (
        <ListItemButton
          key={`${item.url}-${i}`}
          component={Link}
          href={item.url}
          target="_blank"
          rel="noopener"
        >
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
}
