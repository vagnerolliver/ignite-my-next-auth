import {ReactNode, createContext } from 'react'

// Parte 1 - Criar context

type SignInCredentials = {
  email: string,
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>,
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

// Parte 2 - Criar o provider do contexto

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('1', { email, password})
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
