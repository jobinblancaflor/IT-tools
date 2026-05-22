import { createRouter, createWebHistory } from 'vue-router';
import { layouts } from './layouts/index';
import HomePage from './pages/Home.page.vue';
import NotFound from './pages/404.page.vue';
import { tools } from './tools';
import { config } from './config';
import { routes as demoRoutes } from './ui/demo/demo.routes';

const toolsRoutes = tools.map(({ path, name, component, ...config }) => ({
  path,
  name,
  component,
  meta: { isTool: true, layout: layouts.toolLayout, name, ...config },
}));
const toolsRedirectRoutes = tools
  .filter(({ redirectFrom }) => redirectFrom && redirectFrom.length > 0)
  .flatMap(
    ({ path, redirectFrom }) => redirectFrom?.map(redirectSource => ({ path: redirectSource, redirect: path })) ?? [],
  );

const router = createRouter({
  history: createWebHistory(config.app.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./pages/About.vue'),
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('./pages/Blogs.page.vue'),
    },
    {
      path: '/blogs/:slug',
      name: 'blog-detail',
      component: () => import('./pages/BlogDetail.page.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./pages/Contact.page.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('./pages/PrivacyPolicy.page.vue'),
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('./pages/TermsOfService.page.vue'),
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('./pages/Disclaimer.page.vue'),
    },
    {
      path: '/cookie-policy',
      name: 'cookie-policy',
      component: () => import('./pages/CookiePolicy.page.vue'),
    },
    ...toolsRoutes,
    ...toolsRedirectRoutes,
    ...(config.app.env === 'development' ? demoRoutes : []),
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export default router;
