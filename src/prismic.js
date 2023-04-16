import * as prismic from '@prismicio/client';

export const repositoryName = 'airdao';

export const client = prismic.createClient(repositoryName, {
  accessToken: process.env.REACT_APP_PRISMIC_ACCESS_TOKEN,
  routes: [
    {
      type: 'homepage',
      path: '/',
    },
    {
      type: 'bridge',
      path: '/bridge',
    },
    {
      type: 'firepot',
      path: '/firepot',
    },
    {
      type: 'staking',
      path: '/staking',
    },
    {
      type: 'explorer',
      path: '/explorer',
    },
    {
      type: 'team',
      path: '/team',
    },
    {
      type: 'binance',
      path: '/binance',
    },
    {
      type: 'airdrop',
      path: '/airdrop',
    },
    {
      type: 'bondmarketplace',
      path: '/bond-marketplace',
    },
  ],
});
