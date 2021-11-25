import { withSSRAuth } from '../utils/withSSRAuth'
import { setupAPIClient } from '../services/api'
 
export default function Metrics() {

  return (
    <>
      <div>Página de Métricas</div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)
  const response = await apiClient.get('/me')
  
  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})