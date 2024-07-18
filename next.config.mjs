/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack5: true,
  };
  
  export default {
    ...nextConfig,
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
    },
  };
  