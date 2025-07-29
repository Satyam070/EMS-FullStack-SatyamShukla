import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, ThemeProvider, CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import VerifyUsername from './components/VerifyUsername';
import NotFoundPage from './components/NotFoundPage';
import theme from './theme';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Container 
            maxWidth="lg" 
            sx={{ 
              flex: '1 0 auto',
              marginTop: '2rem', 
              marginBottom: '2rem',
              padding: { xs: '0 1rem', sm: '0 1.5rem', md: '0 2rem' },
              animation: 'fadeIn 0.5s ease-in-out'
            }}
            className="animate-fadeIn"
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/add-employee" element={<EmployeeForm />} />
              <Route path="/edit-employee/:id" element={<EmployeeForm />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/add-department" element={<DepartmentForm />} />
              <Route path="/edit-department/:id" element={<DepartmentForm />} />
              <Route path="/verify-username" element={<VerifyUsername />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
