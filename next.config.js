/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  // Configuración para mejorar el hot reload
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  // Asegurar que el hot reload funcione correctamente
  experimental: {
    optimizePackageImports: ['@tanstack/react-table', 'lucide-react'],
  },
  // Configuración para desarrollo
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
}

module.exports = nextConfig
