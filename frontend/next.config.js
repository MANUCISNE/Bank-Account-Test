/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Substitui módulos do Node.js por versões vazias no cliente
      config.resolve.fallback = {
        fs: false,
        // Adicione outros módulos do Node.js que você quer substituir aqui
      };
    }

    return config;
  },
};

