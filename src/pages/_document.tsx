import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <title>Taskify</title>
      <link rel="icon" href="/images/logo.png" />
      <Head />
      <body className="scrollbar-hide">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
