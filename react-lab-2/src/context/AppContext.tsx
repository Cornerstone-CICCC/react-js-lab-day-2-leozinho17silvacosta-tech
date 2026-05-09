import { createContext, useState, useContext, type ReactNode } from 'react';

interface User { name: string; isLoggedIn: boolean; }
interface UserContextType {
  user: User;
  login: (name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: '', isLoggedIn: false });

  const login = (name: string) => setUser({ name, isLoggedIn: true });
  const logout = () => setUser({ name: '', isLoggedIn: false });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used inside the UserProvider');
  return context;
};
