/* eslint-disable linebreak-style */
const routes = {
  signUp: {
    welcome: '/sign-up/welcome',
    login: '/login',
    roles: '/sign-up/roles',
    username: '/sign-up/username',
    bio: '/sign-up/bio',
    bank: '/sign-up/bank',
    success: '/sign-up/success',
    index: '/',
  },
  dashboard: {
    dashboard: '/dashboard',
    messages: '/messages',
    profile: '/profile',
    search: '/search',
    success: '/sign-up/success',
    singleMessage: '/message/:id',
    publicProfile: '/:username',
  },
};

export default routes;
