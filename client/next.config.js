module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
    EVOLUTION_BASE_URL: process.env.EVOLUTION_BASE_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/rest/:path*',
        destination: 'https://4388-14-186-59-143.ngrok.io/rest/:path*',
        // destination: 'https://document-manager-app.herokuapp.com/api/:path*',
      },
    ]
  },
}
