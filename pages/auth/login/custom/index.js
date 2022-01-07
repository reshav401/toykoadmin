import {
    Box,
    styled
} from '@mui/material';
import Head from 'next/head';
import BaseLayout from 'src/layouts/BaseLayout';

import LoginForm from 'src/content/CustomAuth/Login/LoginForm'

import { useEffect } from 'react';
import { useRouter } from 'next/router' 
//Custom Mui css
const MainContent = styled(Box)(
  () => `
    padding-top : 100px;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  `
);

function LoginCover() {

  const router = useRouter();

  useEffect(() => {
    if (localStorage.Token) {
      router.push({
        pathname: '/',
        query: { backTo: router.asPath }
      });
    } 
  }, [router.isReady]);
  
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <MainContent>
        <LoginForm/>
      </MainContent>
    </>
  );
  
}
  
LoginCover.getLayout = (page) => (
  <BaseLayout>{page}</BaseLayout>
);

export default LoginCover;
  