import { parseCookies, setCookie } from 'nookies' 
import axios, { AxiosError } from "axios";

let cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()

      const { 'nextauth.refreshToken': refreshToken } = cookies

      api.post('/refresh', {
        refreshToken
      }).then(response => {
        const { token, refreshToken } = response.data

        setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
          maxAge: 60 * 60 * 25 * 30, // 30 days
          path: '/'
        })
  
        setCookie(undefined, 'nextauth.token', token, {
          maxAge: 60 * 60 * 25 * 30, // 30 days
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`
      })


    } else {
      // deslogar
    }
  }
});