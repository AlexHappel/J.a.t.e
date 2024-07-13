const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the hidden class from the install button
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);

  // Reset the deferred prompt variable
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed', event);
  // Optionally show a toast or notification to inform the user that the app was installed
});
