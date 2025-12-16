import { createContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  token: string | null;
  email: string | null;
  role: string | null;
  setUserContext: (token: string | null, email: string | null, role: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  token: null,
  email: null,
  role: null,
  setUserContext: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const setUserContext = (
    newToken: string | null,
    newEmail: string | null,
    newRole: string | null,
  ) => {
    setToken(newToken);
    setEmail(newEmail);
    setRole(newRole);
  };

  return (
    <UserContext.Provider value={{ token, email, role, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
