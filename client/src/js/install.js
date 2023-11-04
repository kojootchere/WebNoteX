// Get the installation button element by its ID
const butInstall = document.getElementById('buttonInstall');

// Variable to hold the event prompt for later use
let deferredPrompt;

// Add event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update the install button to be visible
  butInstall.style.display = 'inline-block';
});

// Add event listener for the 'click' event on the install button
butInstall.addEventListener('click', () => {
  // Show the install prompt to the user
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    // Check the user's choice for installing the PWA
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User declined the installation');
    }
    // We no longer need the prompt after the choice is made
    deferredPrompt = null;
  });
});

// Add event listener for 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  // Log an event when the app is installed
  console.log('app installed')
});
