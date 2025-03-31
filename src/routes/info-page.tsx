import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ConfluenceList from "../components/info/confluence/confluence-list";
import ConfluenceModal from "../components/info/confluence/confluence-modal";
import LinkList from "../components/info/link-list";
import {
  figmaLinks,
  gitLinks,
  jiraLinks,
  swaggerLinks,
} from "../constants/link";
import {
  fetchConfluencePage,
  fetchConfluenceSearch,
} from "../apis/confluence/api";
import ArticleIcon from "@mui/icons-material/Article";
import BrushIcon from "@mui/icons-material/Brush";
import ApiIcon from "@mui/icons-material/Api";
import BugReportIcon from "@mui/icons-material/BugReport";
import { IConfluenceSearchResult } from "../intefaces/info.interface";

export default function InfoPage() {
  const [html, setHtml] = useState<string>("");
  const [pages, setPages] = useState<IConfluenceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pagesPending, setPagesPending] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPageId = searchParams.get("id") ?? "";

  // 문서 목록 불러오기
  useEffect(() => {
    setPagesPending(true); // 로딩 시작
    fetchConfluenceSearch("frontend")
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
        setPagesPending(false); // 로딩 끝
      });
  }, []);

  // 선택된 문서 불러오기
  useEffect(() => {
    if (!selectedPageId) return;

    // 즉시 초기화 (중간 깜빡임 방지)
    setHtml("");
    setLoading(true);

    fetchConfluencePage(selectedPageId)
      .then((data) => {
        setHtml(
          data?.body?.view?.value ?? "<p>문서를 불러오지 못했습니다.</p>"
        );
        setModalOpen(true);
      })
      .catch((err) => {
        console.error("문서 로딩 실패:", err);
        setHtml("<p>문서를 불러오지 못했습니다.</p>");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedPageId]);

  // 문서 선택 시 쿼리 파라미터로 id 설정
  const handleSelect = (id: string) => {
    setSearchParams({ id });
  };

  const cardItems = [
    {
      title: "📝 스웨거",
      subtitle: "백엔드 API들!",
      icon: <ApiIcon fontSize="large" />,
      content: <LinkList items={swaggerLinks} />,
      size: 7,
    },
    {
      title: "🖌️ 피그마",
      subtitle: "화면 UI 모음은 여기!",
      icon: <BrushIcon fontSize="large" />,
      content: <LinkList items={figmaLinks} />,
      size: 5,
    },
    {
      title: "🛎️ 지라",
      subtitle: "이슈 추적과 작업 흐름!",
      icon: <BugReportIcon fontSize="large" />,
      content: <LinkList items={jiraLinks} />,
      size: 5,
    },
    {
      title: "🛎️ 깃 저장소",
      subtitle: "원격 저장소(소스코드)",
      icon: <BugReportIcon fontSize="large" />,
      content: <LinkList items={gitLinks} />,
      size: 7,
    },
    {
      title: "📄 Frontend Docs",
      subtitle: "온보딩 문서를 한눈에 👀",
      icon: <ArticleIcon fontSize="large" />,
      content: (
        <ConfluenceList
          pages={pages}
          selectedId={selectedPageId}
          onSelect={handleSelect}
          loading={pagesPending}
        />
      ),
      size: 12,
    },
  ];

  return (
    <Box sx={{ p: 4, height: "100%" }}>
      <Grid container spacing={4}>
        {cardItems.map((item, idx) => (
          <Grid key={idx} size={item.size}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: 3,
                boxShadow: 2,

                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.015)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  height: "100%",
                  px: 2,
                  pt: 2,
                  pb: 0,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ mr: 2 }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ pt: 0, flexGrow: 1 }}>
                  {item.content}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ConfluenceModal
        open={modalOpen || loading}
        onClose={() => {
          setModalOpen(false);
          setSearchParams({});
        }}
        loading={loading}
        html={html}
      />
    </Box>
  );
}
