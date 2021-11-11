import { parseCookies } from 'nookies' 
import axios from "axios";

const cookies = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})