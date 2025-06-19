import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Legal AI Assistant</Typography>
      <Button variant="contained" onClick={() => navigate('/chat')}>
        Go to Chat
      </Button>
      <Button variant="outlined" onClick={logout} sx={{ ml: 2 }}>
        Logout
      </Button>
    </Box>
  );
}

export default Dashboard;
