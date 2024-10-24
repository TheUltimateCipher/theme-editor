// Function to choose random image for particles
function getRandomImage() {
  const images = [
    'Themes/images/hack/hack.png',
    'Themes/images/hack/hack2.png',
  ];
  return images[Math.floor(Math.random() * images.length)];
}

particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    shape: {
      type: 'image', // Using custom image for the particle
      image: {
        src: getRandomImage(), // Call the function to randomly pick an image
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 50,
      random: true,
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    },
  },
  retina_detect: true,
});
