import * as React from 'react'
import App, { AppProps } from 'next/app'
// 全体に適応する外部 CSS を読み込む
import 'sanitize.css'

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps }: AppProps = this.props

    return (
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    )
  }
}

export default MyApp
