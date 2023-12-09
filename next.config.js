/** @type {import('next').NextConfig} */
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/characters',
          permanent: true,
        },
      ]
    },
  }
  