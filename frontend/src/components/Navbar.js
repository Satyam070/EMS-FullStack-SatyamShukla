import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  useTheme,
  Container
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Check if screen width is below 1000px
  const isMobile = useMediaQuery('(max-width:1000px)');

  const isActive = path => currentPath === path;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    handleProfileMenuClose();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <BadgeRoundedIcon /> },
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Employees', path: '/employees', icon: <PeopleIcon /> },
    { name: 'Departments', path: '/departments', icon: <BusinessIcon /> },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
        pt: 2
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          mb: 2
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 52,
            height: 52,
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
          }}
        >
          <BadgeRoundedIcon fontSize="large" />
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            ml: 2,
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          EMS
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            onClick={handleDrawerToggle}
            sx={{
              py: 1.5,
              mb: 1,
              borderRadius: '0 24px 24px 0',
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: `${theme.palette.primary.main}15`,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}25`,
                }
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <Box sx={{
              color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.secondary,
              mr: 2
            }}>
              {item.icon}
            </Box>
            <ListItemText
              primary={item.name}
              sx={{
                color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                '& .MuiTypography-root': {
                  fontWeight: isActive(item.path) ? 600 : 500,
                }
              }}
            />
          </ListItem>
        ))}

        {/* Profile */}
        <ListItem
          button
          component={Link}
          to="/profile"
          selected={isActive('/profile')}
          onClick={handleDrawerToggle}
          sx={{
            py: 1.5,
            mb: 1,
            borderRadius: '0 24px 24px 0',
            mx: 1,
            '&.Mui-selected': {
              backgroundColor: `${theme.palette.primary.main}15`,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}25`,
              }
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <Box sx={{
            color: isActive('/profile') ? theme.palette.primary.main : theme.palette.text.secondary,
            mr: 2
          }}>
            <AccountCircleIcon />
          </Box>
          <ListItemText
            primary="Profile"
            sx={{
              color: isActive('/profile') ? theme.palette.primary.main : theme.palette.text.primary,
              '& .MuiTypography-root': {
                fontWeight: isActive('/profile') ? 600 : 500,
              }
            }}
          />
        </ListItem>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              py: 1.5,
              mb: 1,
              borderRadius: '0 24px 24px 0',
              mx: 1,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: `${theme.palette.error.main}15`,
              }
            }}
          >
            <Box sx={{ mr: 2 }}>
              <LogoutIcon />
            </Box>
            <ListItemText
              primary="Logout"
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 500,
                }
              }}
            />
          </ListItem>
        ) : (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              selected={isActive('/login')}
              onClick={handleDrawerToggle}
              sx={{
                py: 1.5,
                mb: 1,
                borderRadius: '0 24px 24px 0',
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: `${theme.palette.primary.main}15`,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}25`,
                  }
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <Box sx={{
                color: isActive('/login') ? theme.palette.primary.main : theme.palette.text.secondary,
                mr: 2
              }}>
                <LoginIcon />
              </Box>
              <ListItemText
                primary="Login"
                sx={{
                  color: isActive('/login') ? theme.palette.primary.main : theme.palette.text.primary,
                  '& .MuiTypography-root': {
                    fontWeight: isActive('/login') ? 600 : 500,
                  }
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              selected={isActive('/register')}
              onClick={handleDrawerToggle}
              sx={{
                py: 1.5,
                mb: 1,
                borderRadius: '0 24px 24px 0',
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: `${theme.palette.primary.main}15`,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}25`,
                  }
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <Box sx={{
                color: isActive('/register') ? theme.palette.primary.main : theme.palette.text.secondary,
                mr: 2
              }}>
                <PersonAddIcon />
              </Box>
              <ListItemText
                primary="Register"
                sx={{
                  color: isActive('/register') ? theme.palette.primary.main : theme.palette.text.primary,
                  '& .MuiTypography-root': {
                    fontWeight: isActive('/register') ? 600 : 500,
                  }
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: { xs: 1, md: 0.5 } }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                flex: { xs: 1, md: 0 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  mr: 1.5,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <BadgeRoundedIcon />
              </Avatar>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px'
                }}
              >
                EMS
              </Typography>
            </Box>

            {/* Render drawer icon for mobile view */}
            {isMobile ? (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  ml: 'auto',
                  color: theme.palette.primary.main,
                  bgcolor: `${theme.palette.primary.main}10`,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}20`,
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              // Render full menu for desktop view
              <>
                <Box sx={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginLeft: '2rem',
                  flex: 1
                }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none',
                        fontWeight: 500,
                        color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                        backgroundColor: isActive(item.path) ? `${theme.palette.primary.main}10` : 'transparent',
                        '&:hover': {
                          backgroundColor: isActive(item.path)
                            ? `${theme.palette.primary.main}20`
                            : theme.palette.action.hover
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Profile Button and Menu */}
                  <Button
                    id="profile-button"
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleProfileMenuClick}
                    startIcon={<AccountCircleIcon />}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: theme.shape.borderRadius,
                      textTransform: 'none',
                      fontWeight: 500,
                      color: isActive('/profile') ? theme.palette.primary.main : theme.palette.text.primary,
                      backgroundColor: isActive('/profile') ? `${theme.palette.primary.main}10` : 'transparent',
                      '&:hover': {
                        backgroundColor: isActive('/profile')
                          ? `${theme.palette.primary.main}20`
                          : theme.palette.action.hover
                      },
                    }}
                  >
                    Profile
                  </Button>
                  <Menu
                    id="profile-menu"
                    MenuListProps={{
                      'aria-labelledby': 'profile-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleProfileMenuClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        borderRadius: theme.shape.borderRadius,
                        minWidth: 180,
                        overflow: 'visible',
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleProfileMenuClose();
                        navigate('/profile');
                      }}
                      sx={{ py: 1, px: 2 }}
                    >
                      <AccountCircleIcon fontSize="small" sx={{ mr: 1.5 }} />
                      My Profile
                    </MenuItem>
                    {isLoggedIn && (
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          py: 1,
                          px: 2,
                          color: theme.palette.error.main,
                          '&:hover': {
                            bgcolor: `${theme.palette.error.main}10`,
                          }
                        }}
                      >
                        <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                        Logout
                      </MenuItem>
                    )}
                  </Menu>

                  {/* Auth Buttons */}
                  {!isLoggedIn && (
                    <>
                      <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        startIcon={<LoginIcon />}
                        sx={{
                          ml: 2,
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: `${theme.palette.primary.main}10`,
                          }
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        sx={{
                          ml: 1.5,
                          bgcolor: theme.palette.primary.main,
                          color: '#fff',
                          '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                          }
                        }}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
        variant="temporary"
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
