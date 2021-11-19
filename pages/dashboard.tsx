import { useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { withSSRAuth } from '../utils/withSSRAuth'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'


export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(error => console.log(error)) 
  },[])

  return (<h1>Hello User: {JSON.stringify(user)}</h1>)
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)
  const response = await apiClient.get('/me')

  console.log(response?.data)
  
  return {
    props: {}
  }
})