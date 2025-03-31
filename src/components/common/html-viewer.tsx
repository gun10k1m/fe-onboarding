import { Box } from "@mui/material";

export default function HtmlViewer({ html }: { html: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        overflowX: "auto",
        "& h1, h2, h3, h4, h5": {
          fontWeight: 600,
          color: "primary.main",
          mt: 3,
          mb: 1,
        },
        "& p": {
          lineHeight: 1.8,
          mb: 2,
          color: "text.primary",
        },
        "& ul": {
          pl: 3,
          mb: 2,
          listStyle: "disc",
        },
        "& code": {
          fontFamily: "monospace",
          fontSize: "0.875rem",
          backgroundColor: "#eee",
          px: 0.5,
          borderRadius: "4px",
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          my: 3,
        },
        "& th, & td": {
          border: "1px solid #ccc",
          padding: "8px",
          textAlign: "left",
        },
        "& th": {
          backgroundColor: "#f0f0f0",
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
          my: 2,
        },
        "& a": {
          color: "primary.main",
          textDecoration: "underline",
        },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
