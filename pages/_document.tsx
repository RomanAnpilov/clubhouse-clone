import Document, { Html, Head, Main, NextScript } from 'next/document'
import Cookies from "nookies"
import { Axios } from '../core/axios';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    // const cookies = Cookies.get(ctx);
    // if (cookies.token) {
    //   Axios.defaults.headers.common.Authorization = `Bearer ${cookies.token}`;
    // }
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head >
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Clubhouse: Drop-in audio chat</title> */}
            <link rel="preconnect" href="https://fonts.gstatic.com"  /> 
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument