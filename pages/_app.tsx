import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactGa from 'react-ga';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    ReactGa.initialize('UA-234221342-1');
    ReactGa.pageview(useRouter().pathname);
  }, [])

  return(
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
