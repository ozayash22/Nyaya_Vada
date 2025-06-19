import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sessions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSessions(res.data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };
    fetchSessions();
  }, [sessionId]);

  const handleNewChat = () => {
    navigate(`/chat/${Date.now()}`);
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#f5f5f5",
        height: "100vh",
        overflowY: "auto",
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chats
      </Typography>
      <Button
        variant="contained"
        fullWidth
        onClick={handleNewChat}
        sx={{
          mb: 2,
          height: "56px",
          px: 4,
          borderRadius: "12px",
          backgroundColor: "#0a2463",
          color: "#ffffff",
          whiteSpace: "nowrap",
          "&:hover": {
            backgroundColor: "#071952",
          },
        }}
      >
        + New Chat
      </Button>
      <Divider />
      <List>
        {sessions.map((session, index) => (
          <React.Fragment key={session.session_id}>
            <ListItem
              button
              selected={session.session_id === sessionId}
              onClick={() => navigate(`/chat/${session.session_id}`)}
            >
              <ListItemText
                primary={
                  session.title?.slice(0, 50) ||
                  `Session on ${new Date(session.created_at).toLocaleString()}`
                }
              />
            </ListItem>
            {index < sessions.length - 1 && <Divider /> }
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
