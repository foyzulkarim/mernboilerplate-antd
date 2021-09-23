import { useState, useCallback } from 'react'

export default function useAuthModel() {
  const [auth, setAuth] = useState({ user: {}, isAuthenticated: false, token: '' });

  return {
    auth,
    setAuth,
  }
}
