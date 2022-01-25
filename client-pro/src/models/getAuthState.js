import { useState, useCallback, useEffect } from 'react'

export default function useAuthModel() {
  const [auth, setAuth] = useState({ userInfo: null, isAuthenticated: false, token: '' });
  console.log('useAuthModel>auth', auth);
  useEffect(() => {
    const dbAuthData = localStorage.getItem('auth');
    console.log('Pulling from localStorage', dbAuthData);
    if (dbAuthData) {
      const authData = JSON.parse(dbAuthData);
      console.log('useAuthModel>useEffect>authData', authData);
      if (authData && authData.token && authData.userInfo) {
        setAuth({ isAuthenticated: true, token: authData.token, userInfo: authData.userInfo });
      }
      else localStorage.removeItem('auth');
    }
  }, []);

  const setAuthentication = (data) => {
    console.log('2.setAuthentication called with', data);
    const auth = { userInfo: data.userInfo, isAuthenticated: true, token: data.token };
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
  }

  return {
    auth,
    setAuthentication,
  }
}
