import { useParams, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchConfluencePage } from "../apis/confluence/api";
import HtmlViewer from "../components/common/html-viewer";

export default function ProjectDetailPage() {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  // 선택된 문서 불러오기
  useEffect(() => {
    if (!projectId) return;

    setHtml("");
    setLoading(true);

    fetchConfluencePage(projectId)
      .then((data) => {
        setHtml(
          data?.body?.view?.value ?? "<p>문서를 불러오지 못했습니다.</p>"
        );
      })
      .catch((err) => {
        console.error("문서 로딩 실패:", err);
        setHtml("<p>문서를 불러오지 못했습니다.</p>");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        mb: 10,
        width: "100%",
        gap: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {loading ? (
        <Box
          sx={{
            flex: 1,
            minHeight: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <HtmlViewer html={html} />
      )}
    </Box>
  );
}
