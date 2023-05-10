const { i18n } = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching,
});

module.exports = withPWA({
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
  
    // domains: ['xint.com.tr',
    // 'www.alinderi.com.tr',
    // 'static.ticimax.cloud',
    // 'ik.imagekit.io',
    // 'static.zara.net',
    // 'cdn.sorsware.com',
    // 'lp2.hm.com',
    // 'cdn3.sorsware.com',
    // 'romancdn.sysrun.net','romancdn.sysrun.net'],
  },
});
