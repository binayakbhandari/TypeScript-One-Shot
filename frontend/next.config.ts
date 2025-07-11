import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        protocol : 'http',
        hostname : 'localhost'
      },
      {
        protocol : 'https',
        hostname : 'encrypted-tbn0.gstatic.com'
      },
      {
        protocol : 'https',
        hostname : 'www.stampegrafica.plus'
      },
      {
        protocol : 'https',
        hostname : ''
      }
    ]
  }
};

export default nextConfig;
