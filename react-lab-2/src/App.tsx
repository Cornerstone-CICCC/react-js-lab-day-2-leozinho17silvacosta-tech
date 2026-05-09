import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/AppContext';
import Login from './pages/Login';
import TodoList from './pages/TodoList';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return user.isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/todos" 
              element={<PrivateRoute><TodoList /></PrivateRoute>} 
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
}
