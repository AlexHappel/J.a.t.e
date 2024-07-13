import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

if ('serviceWorker' in navigator) {
  if (process.env.NODE_ENV === 'production') {
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register().then((registration) => {
      console.log('Service worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  } else {
    // Unregister any existing service workers in development
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then(() => {
          console.log('Service worker unregistered');
        }).catch((error) => {
          console.error('Service worker unregistration failed:', error);
        });
      }
    });
  }
} else {
  console.log('Service workers are not supported in this browser.');
}
