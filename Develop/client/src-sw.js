const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching

const assetsCache = new CacheFirst({
  cacheName: 'assets-cache', // Choose a cache name for assets
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache responses with HTTP status 0 and 200
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for 7 days
    }),
  ],
});

// Register a route for caching assets
registerRoute(
  // Specify the pattern for assets you want to cache (e.g., all files in /static/)
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  assetsCache // Use the caching strategy for assets
);