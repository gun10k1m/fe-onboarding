import { Box, Typography, Avatar, Divider, Paper, Grid } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

const colors = ["#7b61ff", "#00c49f", "#ff8042"];

const teamMembers = [
  { name: "Gun", role: "Frontend Developer", office: "Seoul" },
  { name: "Koala", role: "Frontend Developer", office: "Seoul" },
  { name: "Woodi", role: "Frontend Developer", office: "Daegu" },
];

export default function HomePage() {
  return (
    <Box sx={{ p: 4, height: "100%" }}>
      <Box
        textAlign="center"
        mb={8}
        mt={10}
        sx={{
          transition: "all 0.3s ease",
          transform: "scale(1.02)",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          👋 Welcome..!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          팀에 합류해주셔서 반가워요 🙌
        </Typography>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          <GroupIcon fontSize="small" sx={{ mr: 1 }} />
          팀을 소개합니다
        </Typography>

        <Grid container spacing={2} mt={4}>
          {teamMembers.map((member, index) => (
            <Grid key={member.name} size={4}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  gap: "4px",
                  borderRadius: 3,
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: colors[index % colors.length],
                    width: 50,
                    height: 50,
                    mb: 1,
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography color="text.secondary">{member.role}</Typography>
                <Box>
                  <Typography fontWeight="bold" mt={1}>
                    닉네임: {member.name}
                  </Typography>
                  <Typography color="text.secondary">
                    오피스: {member.office}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
