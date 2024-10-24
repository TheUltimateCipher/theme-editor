particlesJS('particles-js', {
  "particles": {
      "number": {
          "value": 80,
          "density": {
              "enable": true,
              "value_area": 800
          }
      },
      "color": {
          "value": "#424242" // Blackish color for particles
      },
      "shape": {
          "type": "circle"
      },
      "opacity": {
          "value": 1,
          "random": false,
          "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
          }
      },
      "size": {
          "value": 5,
          "random": true,
          "anim": {
              "enable": false
          }
      },
      "line_linked": {
          "enable": false // Disable lines connecting particles
      },
      "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false
      }
  },
  "interactivity": {
      "detect_on": "canvas",
      "events": {
          "onhover": {
              "enable": false
          },
          "onclick": {
              "enable": false
          },
          "resize": true
      }
  },
  "retina_detect": true
});