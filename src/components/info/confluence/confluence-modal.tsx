import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HtmlViewer from "../../common/html-viewer";

export default function ConfluenceModal({
  open,
  onClose,
  loading,
  html,
}: {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  html: string;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">📄 문서 내용</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

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
    </Modal>
  );
}
