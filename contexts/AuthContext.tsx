import {ReactNode, createContext } from 'react'
import { api } from '../services/api'

// INICIO Parte 1 - Criar context

type SignInCredentials = {
  email: string,
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>,
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

// FIM Parte 1 - Criar context

// INICIO Parte 2 - Criar o provider do contexto

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    try { 
      const result = await  api.post('sessions', { email, password })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// FIM Parte 2 - Criar o provider do contexto

