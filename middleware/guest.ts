export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie('token');
    
    if (token.value) {
      abortNavigation();
      return navigateTo('/dashboard');
    }
})