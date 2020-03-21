import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
interface CustomDocumentInterface {
  url: string
  title: string
  description: string
}

class CustomDocument extends Document implements CustomDocumentInterface {
  url = 'https://example.com'
  title = 'Demo Next.js'
  description = 'Demo of Next.js'

  // SSR 時に styled-components で追加したスタイルが適応されない問題の対応
  static async getInitialProps(ctx): Promise<any> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = (): any =>
        originalRenderPage({
          enhanceApp: (App) => (props): void =>
            sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="theme-color" content="#333" />
          {/* Open Graph Protcol対応 */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.title} />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.title} />
          {/* <meta property="og:image" content={`${this.url}/ogp.png`} /> */}
          <meta name="format-detection" content="telephone=no" />
          {/* Twitter Card対応 */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.title} />
          {/* <meta name="twitter:description" content={this.description} /> */}
          {/* <meta name="twitter:image" content={`${this.url}/ogp.png`}></meta> */}
          <link rel="icon" href="/favicon.ico" />
          {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
          {/* PWA対応 */}
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument