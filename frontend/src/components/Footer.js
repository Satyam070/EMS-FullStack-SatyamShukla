import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, IconButton, useTheme } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const theme = useTheme();
  
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        pt: 3,
        pb: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}>
              About Us
            </Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
            }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  mr: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>E</Typography>
              </Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                EMS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1, lineHeight: 1.5 }}>
              We provide a comprehensive Employee Management System that helps you manage employees and departments with ease.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
              <IconButton 
                size="small" 
                sx={{
                  color: '#fff',
                  backgroundColor: '#0077B5',
                  '&:hover': { backgroundColor: '#005885' },
                  width: 28,
                  height: 28
                }}
              >
                <LinkedInIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{
                  color: '#fff',
                  backgroundColor: '#333',
                  '&:hover': { backgroundColor: '#000' },
                  width: 28,
                  height: 28
                }}
              >
                <GitHubIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{
                  color: '#fff',
                  backgroundColor: '#1DA1F2',
                  '&:hover': { backgroundColor: '#0d8ecf' },
                  width: 28,
                  height: 28
                }}
              >
                <TwitterIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{
                  color: '#fff',
                  backgroundColor: '#3b5998',
                  '&:hover': { backgroundColor: '#2d4373' },
                  width: 28,
                  height: 28
                }}
              >
                <FacebookIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{
                  color: '#fff',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  '&:hover': { 
                    background: 'linear-gradient(45deg, #bc1888 0%, #cc2366 25%, #dc2743 50%, #e6683c 75%, #f09433 100%)',
                  },
                  width: 28,
                  height: 28
                }}
              >
                <InstagramIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 1 }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Employees', path: '/employees' },
                { label: 'Departments', path: '/departments' },
                { label: 'Profile', path: '/profile' },
                { label: 'Login', path: '/login' },
                { label: 'Register', path: '/register' }
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.path} 
                  underline="none"
                  sx={{ 
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    py: 0.5,
                    fontSize: '0.875rem',
                    position: 'relative',
                    width: 'fit-content',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      color: theme.palette.primary.main,
                      transform: 'translateX(3px)',
                    } 
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}>
              Contact Us
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ fontSize: 18, color: theme.palette.primary.main, mr: 1 }} />
                  <Link 
                    href="mailto:satyamshuklanew@gmail.com" 
                    underline="none"
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: '0.875rem',
                      '&:hover': { color: theme.palette.primary.main } 
                    }}
                  >
                    Email Us
                  </Link>
                </Box>
              </Grid>
              
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ fontSize: 18, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    +91 7983827575
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Ghaziabad
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GitHubIcon sx={{ fontSize: 18, color: theme.palette.primary.main, mr: 1 }} />
                  <Link 
                    href="https://github.com/Satyam070" 
                    underline="none"
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontSize: '0.875rem',
                      '&:hover': { color: theme.palette.primary.main } 
                    }}
                  >
                    Satyam
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
            © {year} Employee Management System. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mt: { xs: 1, sm: 0 } }}>
            <Link href="#" underline="hover" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
              Privacy
            </Link>
            <Link href="#" underline="hover" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
              Terms
            </Link>
            <Link href="#" underline="hover" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;