
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
               <Head> 
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    {/* NProgress Preloader */}
                    <div className='nloader'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument