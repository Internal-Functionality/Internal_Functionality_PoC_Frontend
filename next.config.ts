// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

// 👇 Indica exactamente dónde está tu archivo de configuración
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {}, // evita warnings con Turbopack
    },
  },
});

