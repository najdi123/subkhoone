import Head from 'next/head'
import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CookiesProvider } from 'react-cookie';
import DataContextProvider from "../context/DataContext";

function MyApp({Component,pageProps}) {
  return (
      <CookiesProvider>
          <DataContextProvider>
        <Head>
          <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
              crossorigin="anonymous"
          />
          <script
              src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
              crossorigin="anonymous"
          />
          <script
              src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
              crossorigin="anonymous"
          />
          <script
              src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
              crossorigin="anonymous"
          />
        </Head>
        <Component {...pageProps}/>
          </DataContextProvider>
      </CookiesProvider>
  );
}

export default MyApp;