if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        // scope: '/',
      });

      if (registration) {
      }
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  });
}
