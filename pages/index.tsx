import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent, useState, useContext } from 'react'
import { parseCookies } from 'nookies'

import { withSSRGuest } from '../utils/withSSRGuest'
import { AuthContext } from '../contexts/AuthContext'

import styles from '../styles/Home.module.css'
import { redirect } from 'next/dist/server/api-utils'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    const data = {
      email,
      password,
    }
    
    await signIn(data);

    console.log('2', data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {}
  }
})