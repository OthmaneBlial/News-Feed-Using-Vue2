export default [
  {
    path: '/all',
    name: 'all',
    component: require('./../pages/all-news.vue'),
  },
  {
    path: '/custom',
    name: 'custom',
    component: require('./../pages/news-by-channel.vue'),
  },
  {
    path: '/',
    redirect: '/all',
  },
  {
    path: '/*',
    redirect: '/all'
  }
];
