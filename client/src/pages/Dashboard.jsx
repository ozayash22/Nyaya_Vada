import React from 'react';
import { Button, Typography, Box, Container, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(to bottom, #121212, #1a1a1a)' 
        : 'linear-gradient(to bottom, #f5f7fa, #ffffff)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#0a2463',
        color: 'white',
        py: 2,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: 'white' }}>Nyaya</span>
          <span style={{ color: '#d4af37' }}>Vada</span>
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            sx={{ 
              mr: 2,
              color: theme.palette.mode === 'dark' ? '#d4af37' : 'white',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#071952'
              }
            }}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              mr: 2,
              color: theme.palette.mode === 'dark' ? '#d4af37' : 'white',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#071952'
              }
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 8
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" sx={{ 
            fontWeight: 'bold',
            mb: 3,
            color: theme.palette.mode === 'dark' ? '#d4af37' : '#0a2463'
          }}>
            LEARN FROM THE BEST, BE YOUR BEST.
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 4,
            color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'
          }}>
            Get unlimited access to AI-powered legal analysis and research.
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#0a2463',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#071952'
                }
              }}
              onClick={() => navigate('/chat')}
            >
              Start Chat Now
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#0a2463',
        color: theme.palette.mode === 'dark' ? '#d4af37' : 'white',
        py: 3,
        textAlign: 'center'
      }}>
        <Typography variant="body1">
          <span style={{ fontWeight: 'bold' }}>NyayaVada</span> - Transforming legal practice with AI
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
          Curated by NyayaVada Team
        </Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;