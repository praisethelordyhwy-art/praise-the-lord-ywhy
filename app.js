let deferredPrompt = null;
const installButtons = [document.querySelector('#install'), document.querySelector('#heroInstall')];
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e; installButtons.forEach(b => b && (b.hidden = false));
});
installButtons.forEach(button => button && button.addEventListener('click', async () => {
  if (!deferredPrompt) {
    document.querySelector('#help').textContent = 'Sur iPhone : Safari → Partager → Ajouter à l’écran d’accueil. Sur Android : menu du navigateur → Installer l’application.';
    return;
  }
  deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null;
}));
window.addEventListener('appinstalled', () => installButtons.forEach(b => b && (b.hidden = true)));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
