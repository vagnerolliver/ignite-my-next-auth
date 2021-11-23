import { useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { withSSRAuth } from '../utils/withSSRAuth'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { UseCan } from '../hooks/UseCan'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = UseCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(error => console.log(error)) 
  },[])

  return (
    <>
      <h1>Hello User: {JSON.stringify(user)}</h1>
      
      { userCanSeeMetrics && <div>Métricas</div> }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)
  const response = await apiClient.get('/me')
  
  return {
    props: {}
  }
})