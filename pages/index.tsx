import { FormEvent, useState, useContext } from 'react';
import type { NextPage } from 'next'

import { AuthContext } from '../contexts/AuthContext'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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

export default Home
