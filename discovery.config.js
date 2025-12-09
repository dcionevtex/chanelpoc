
module.exports = {
  direction: 'rtl',
  seo: {
  "title": "FastStore",
  "description": "A fast and performant store framework",
  "titleTemplate": "%s | FastStore",
  "author": "FastStore"
},

  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: process.env.NEXT_PUBLIC_STORE_ID || "chanelglobaldemo",
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
    incrementAddress: false,
  },

  // Default session
  session: {
    currency: {
      code: "AED",
      symbol: "د.إ.‏",
    },
    locale: "ar-AE",
    channel: '{"salesChannel":1,"regionId":""}',
    country: "ARE",
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // Production URLs
  storeUrl: "https://chanelglobaldemo.vtex.app",
  secureSubdomain: "https://secure.vtexfaststore.com/",
  checkoutUrl: "https://chanelglobaldemo.myvtex.com/checkout",
  loginUrl: "https://secure.vtexfaststore.com/api/io/login",
  accountUrl: "https://secure.vtexfaststore.com/api/io/account",

  previewRedirects: {
    home: '/',
    plp: "/%D8%A7%D9%84%D8%B9%D8%B7%D8%B1",
    search: "/s?q=Chanel",
    pdp: "/platinum-egoiste-after-shave-lotion/p",
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: "/platinum-egoiste-after-shave-lotion/p",
      collection: "/%D8%A7%D9%84%D8%B9%D8%B7%D8%B1",
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: "/platinum-egoiste-after-shave-lotion/p",
      collection: "/%D8%A7%D9%84%D8%B9%D8%B7%D8%B1",
      collection_filtered: "/%D8%A7%D9%84%D8%B9%D8%B7%D8%B1/?category-1=%D8%A7%D9%84%D8%B9%D8%B7%D8%B1&brand=Chanel&facets=category-1%2Cbrand%27",
      search: "/s?q=Chanel",
    },
    browser: 'electron',
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: "",
  },

  experimental: {
    nodeVersion: 18,
    cypressVersion: 12,
  },

  vtexHeadlessCms: {
    webhookUrls: [
      "https://chanelglobaldemo.myvtex.com/cms-releases/webhook-releases",
    ],
  },
}
