import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const { 'nextauth.token': token } = parseCookies(context)

    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return fn(context)
  }
}