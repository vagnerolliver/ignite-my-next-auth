import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import decode from 'jwt-decode'

import { AuthTokenError } from "../services/errors/AuthTokenError"
import { validationUserPermissions } from './validationUserPermissions'

type withSSRAuthOptions = {
  permissions?: string[]
  roles?: string[]
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: withSSRAuthOptions) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const { 'nextauth.token': token } = parseCookies(context)

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    if (options) {
      const { permissions, roles } = options
      const user = decode<{ permissions: string[], roles: string[] }>(token)
      const userHasValidationUserPermissions = validationUserPermissions({ user, permissions, roles })

      if (!userHasValidationUserPermissions) {
        return {
           redirect: {
             destination: '/dashboard',
             permanent: false,
           }
        }
      }
    }

    try {
      return await fn(context)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, 'nextauth.token')
        destroyCookie(context, 'nextauth.refreshToken')
  
        return {
          redirect:{
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}