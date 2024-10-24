function setSquareScale() {
  const screenSize = window.innerWidth; // or innerHeight depending on your needs
  const squareScale = screenSize / 1200; // You can adjust this divisor based on your design
  document.documentElement.style.setProperty('--square-scale', squareScale);
}

setSquareScale();
window.addEventListener('resize', setSquareScale);

// Check if VIP-CODE exists in sessionStorage, if not set it to "false"
if (sessionStorage.getItem('VIP-CODE') === null) {
  sessionStorage.setItem('VIP-CODE', 'false');
}

// Check localStorage for the saved theme and particles setting
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no theme is saved
const particlesEnabled = localStorage.getItem('particlesEnabled') === 'true'; // Check if particles should be enabled

// Check sessionStorage for VIP-CODE
const vipCode = sessionStorage.getItem('VIP-CODE') === 'true'; // Check if the user is a VIP

// Set the href of the theme link to the saved theme before the page renders
document.write(`<link id="theme-link" rel="stylesheet" href="Themes/${savedTheme}-theme.css">`);

document.addEventListener("DOMContentLoaded", function() {
  // Load the saved theme's CSS file
  const themeLink = document.createElement('link');
  themeLink.id = 'theme-link';
  themeLink.rel = 'stylesheet';
  if (savedTheme === 'hack' && !vipCode) {
    themeLink.href = `Themes/dark-theme.css`; // Loads dark theme if vip is false
  }else{
    themeLink.href = `Themes/${savedTheme}-theme.css`;
  }
  document.head.appendChild(themeLink);

  // Only load particles if particlesEnabled is true and the user is VIP
  if (particlesEnabled && vipCode) {
    loadParticlesConfig(savedTheme);
  }

  // Make the page visible once the theme is applied
  themeLink.onload = function() {
      document.body.style.visibility = 'visible';
  };
});

function loadParticlesConfig(theme) {
  // Clear any existing particle configuration to prevent conflicts
  const existingParticles = document.querySelector('#particles-config');
  if (existingParticles) existingParticles.remove();

  // Create and load the new particles config for the theme
  const script = document.createElement('script');
  script.src = `Themes/particles-${theme}.js`;
  script.id = 'particles-config';
  script.onload = function() {
    particlesJS.load('particles-js', script.src, function() {
      console.log('Particles.js config loaded for theme:', theme);
    });
  };
  document.head.appendChild(script);
}

function destroyParticles() {
  // Destroy particles by clearing the particle container
  const particlesContainer = document.getElementById('particles-js');
  particlesContainer.innerHTML = ''; // Clear particles
  console.log('Particles destroyed');
}




