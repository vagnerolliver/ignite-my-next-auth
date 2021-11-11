import { ReactNode, createContext, useState, useEffect } from 'react'
import { parseCookies, setCookie } from 'nookies'
import Router from 'next/router'

import { api } from '../services/api'

// INICIO Parte 1 - Criar context

type SignInCredentials = {
  email: string,
  password: string
}

type User = {
  email: string,
  permissions: string[],
  roles: string[],
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>,
  isAuthenticated: boolean,
  user: User
}

export const AuthContext = createContext({} as AuthContextData)

// FIM Parte 1 - Criar context

// INICIO Parte 2 - Criar o provider do contexto

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    
    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data
        
        setUser({ email, permissions, roles })
       
        Router.push('dashboard')
      })
      // .catch(error => {
      //   console.log(error)
      // })
    }
  },[])

  async function signIn({ email, password }: SignInCredentials) {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    try { 
      const { data: { token, refreshToken, permissions, roles } } 
        = await api.post('sessions', { email, password })
      
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 25 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      Router.push('dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

// FIM Parte 2 - Criar o provider do contexto

