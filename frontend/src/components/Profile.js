import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Snackbar, 
  Alert, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Divider, 
  useTheme,
  Paper,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import CakeIcon from '@mui/icons-material/Cake';
import MoodIcon from '@mui/icons-material/Mood';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setShowSnackbar(true);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employees = await getAllEmployees();
        const departments = await getAllDepartments();
        setEmployeeCount(employees.length);
        setDepartmentCount(departments.length);

        const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
        const avgAge = employees.length ? (totalAge / employees.length).toFixed(1) : 0;
        setAverageAge(avgAge);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <>
        <Snackbar 
          open={showSnackbar} 
          onClose={handleCloseSnackbar} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          sx={{ mt: 9 }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="warning" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            You must be logged in to view your profile.{' '}
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleLoginRedirect}
              sx={{ 
                ml: 1, 
                fontWeight: 'bold',
                textDecoration: 'underline'
              }}
            >
              Login
            </Button>
          </Alert>
        </Snackbar>
        <Box sx={{ height: 20 }}></Box>
      </>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const profileData = {
    username: localStorage.getItem('EMSusername') || 'John Doe',
    email: 'user@example.com',
    phone: '+91 98765 43210',
    location: 'Ghaziabad, India',
    role: 'Administrator',
    joinDate: 'January 15, 2023',
    employeeCount,
    departmentCount,
    averageAge,
    averageJobSatisfaction: 'High',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ py: 3, px: { xs: 2, md: 0 } }}>
      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 3,
              height: '100%',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Profile Header with Background */}
              <Box 
                sx={{ 
                  height: 100, 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  position: 'relative'
                }}
              />
              
              {/* Avatar */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -6 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
                  {profileData.username}
                </Typography>
                
                <Chip 
                  label={profileData.role} 
                  color="primary" 
                  size="small" 
                  sx={{ mt: 1 }}
                />
                
                <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                  Member since {profileData.joinDate}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {/* Contact Information */}
              <Box sx={{ px: 3, pb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Contact Information
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: theme.palette.text.secondary, mr: 2 }} />
                  <Typography variant="body2">{profileData.email}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: theme.palette.text.secondary, mr: 2 }} />
                  <Typography variant="body2">{profileData.phone}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ color: theme.palette.text.secondary, mr: 2 }} />
                  <Typography variant="body2">{profileData.location}</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              {/* Logout Button */}
              <Box sx={{ px: 3, pb: 3, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  fullWidth
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Right Column - Dashboard Stats */}
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              Dashboard Overview
            </Typography>
            
            {/* Stats Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} lg={3}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: `${theme.palette.primary.main}15`, 
                      color: theme.palette.primary.main,
                      mb: 1
                    }}
                  >
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {profileData.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Username
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} lg={3}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: `${theme.palette.success.main}15`, 
                      color: theme.palette.success.main,
                      mb: 1
                    }}
                  >
                    <GroupsIcon />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {profileData.employeeCount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Employees
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} lg={3}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: `${theme.palette.info.main}15`, 
                      color: theme.palette.info.main,
                      mb: 1
                    }}
                  >
                    <BusinessIcon />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {profileData.departmentCount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Departments
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} lg={3}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: `${theme.palette.warning.main}15`, 
                      color: theme.palette.warning.main,
                      mb: 1
                    }}
                  >
                    <CakeIcon />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {profileData.averageAge}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Avg. Age
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            {/* Additional Information Cards */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    borderRadius: 3,
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <BadgeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                      <Typography variant="h6">Role Information</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Role
                        </Typography>
                        <Typography variant="body1">
                          {profileData.role}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Permissions
                        </Typography>
                        <Typography variant="body1">
                          Full Access
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Department
                        </Typography>
                        <Typography variant="body1">
                          Administration
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Join Date
                        </Typography>
                        <Typography variant="body1">
                          {profileData.joinDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card 
                  elevation={1} 
                  sx={{ 
                    borderRadius: 3,
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MoodIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                      <Typography variant="h6">Satisfaction Metrics</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Job Satisfaction
                        </Typography>
                        <Typography variant="body1">
                          {profileData.averageJobSatisfaction}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Work Environment
                        </Typography>
                        <Typography variant="body1">
                          Excellent
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Team Morale
                        </Typography>
                        <Typography variant="body1">
                          Very Good
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Productivity
                        </Typography>
                        <Typography variant="body1">
                          Above Average
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
