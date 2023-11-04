const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;
// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'inline-block';
});

butInstall.addEventListener('click', () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User declined the installation');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('app installed')
});