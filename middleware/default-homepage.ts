export default defineNuxtRouteMiddleware((to) => {
    to.path
    
    if (to.path == '/') {
      abortNavigation();
      return navigateTo('/login');
    }
})