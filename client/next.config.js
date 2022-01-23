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
        destination: 'http://localhost:8080/rest/:path*',
        // destination: 'https://document-manager-app.herokuapp.com/api/:path*',
      },
    ]
  },
}
