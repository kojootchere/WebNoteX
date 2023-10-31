const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  
  // Stash the event so it can be triggered later.
  let deferredPrompt = event;
  
  // Update UI notify the user they can add to home screen
  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    // hide our user interface that shows our A2HS button
    butInstall.style.display = 'none';
    
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    
    deferredPrompt = null;
  });
});

// TODO: Implement a click event handler on the `butInstall` element
// This has been handled within the 'beforeinstallprompt' event listener above.

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log app installed to the console
  console.log('PWA was installed');
});
