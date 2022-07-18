import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <UserProvider>
      <Head>
        <title>Guess That Rank</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/LogoforJohn.jpeg" />
        <meta name="description" content="Guess the rank of other players in Valorant, Rocket League, and other games!" />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
