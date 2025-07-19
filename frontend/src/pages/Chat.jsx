import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";
import LogoutIcon from "@mui/icons-material/Logout";

function Chat({ toggleTheme }) {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (sessionId) {
      fetchChatHistory();
    } else {
      navigate(`/chat/${Date.now()}`);
    }
  }, [sessionId]);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (Array.isArray(res.data)) {
        setMessages(res.data);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleHome = async () => {
    navigate("/");
  };

  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const question = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages = [...messages, { message: question, isUser: true }];
    setMessages(newMessages);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ask-legal",
        { question, sessionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const aiAnswer = res.data.answer?.trim() || "No response received.";
      setMessages((prev) => [...prev, { message: aiAnswer, isUser: false }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { message: "Error getting response from AI service", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#121212" : "#0a2463",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <span style={{ color: "#d4af37" }}>Nyaya </span>
            <span style={{ color: "#d4af37" }}>Vada</span>
          </Typography>
          <Box>
            <IconButton
              onClick={handleHome}
              color="inherit"
              sx={{
                color: theme.palette.mode === "dark" ? "#d4af37" : "white",
              }}
            >
              Home
            </IconButton>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon sx={{ color: "#d4af37" }} />
              ) : (
                <Brightness4Icon sx={{ color: "white" }} />
              )}
            </IconButton>
            <IconButton onClick={logout} color="inherit">
              <LogoutIcon
                sx={{
                  color: theme.palette.mode === "dark" ? "#d4af37" : "white",
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Static Sidebar */}
        <Box
          sx={{
            width: "280px",
            flexShrink: 0,
            borderRight: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#ddd"
            }`,
            backgroundColor:
              theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <Sidebar />
        </Box>

        {/* Chat Content Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor:
              theme.palette.mode === "dark" ? "#121212" : "#f5f7fa",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: isMobile ? 1 : 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: messages.length === 0 ? "center" : "flex-start",
              alignItems: "center",
            }}
          >
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  textAlign: "center",
                  maxWidth: "600px",
                  padding: "20px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color:
                      theme.palette.mode === "dark" ? "#d4af37" : "#0a2463",
                  }}
                >
                  Ask NyayaVada
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.6)",
                    mb: 3,
                  }}
                >
                  Revolutionize your legal practice with AI-powered case
                  analysis, research assistance, and document automation.
                </Typography>
              </motion.div>
            ) : (
              <Box sx={{ width: "100%", maxWidth: "800px" }}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "flex",
                      justifyContent: msg.isUser ? "flex-start" : "flex-end",
                      marginBottom: "16px",
                      width: "100%",
                    }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        maxWidth: "80%",
                        backgroundColor: msg.isUser
                          ? theme.palette.mode === "dark"
                            ? "#1e1e1e"
                            : "#ffffff"
                          : theme.palette.mode === "dark"
                          ? "#0a2463"
                          : "#d4af37",
                        color: msg.isUser
                          ? theme.palette.text.primary
                          : theme.palette.mode === "dark"
                          ? "#ffffff"
                          : "#0a2463",
                        borderRadius: msg.isUser
                          ? "18px 18px 18px 4px"
                          : "18px 4px 18px 18px",
                        border: msg.isUser
                          ? theme.palette.mode === "dark"
                            ? "1px solid #333"
                            : "1px solid #ddd"
                          : "none",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          fontWeight: "bold",
                          mb: 0.5,
                          color: msg.isUser
                            ? theme.palette.mode === "dark"
                              ? "#d4af37"
                              : "#0a2463"
                            : theme.palette.mode === "dark"
                            ? "#ffffff"
                            : "#0a2463",
                        }}
                      >
                        {msg.isUser ? "You" : "NyayaVada AI"}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.message}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </Box>
            )}
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor:
                theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff",
              borderTop: `1px solid ${
                theme.palette.mode === "dark" ? "#333" : "#ddd"
              }`,
              gap: 2, // adds spacing between TextField and Button
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              placeholder="Ask your legal question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                  "& fieldset": {
                    borderColor:
                      theme.palette.mode === "dark" ? "#444" : "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      theme.palette.mode === "dark" ? "#d4af37" : "#0a2463",
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "56px",
                px: 4,
                borderRadius: "12px",
                backgroundColor: "#0a2463",
                color: "#ffffff",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#071952",
                },
                "&:disabled": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#333" : "#ccc",
                },
              }}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "Analyzing..." : "Ask"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat;
