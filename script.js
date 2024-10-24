const bgPicker = document.getElementById('bgPicker');
bgPicker.addEventListener('input', () => {
  //body.style.backgroundColor = colorPicker.value;
  document.documentElement.style.setProperty('--bg-color', bgPicker.value);
});

const squarePicker = document.getElementById('squarePicker');
squarePicker.addEventListener('input', () => {
  //body.style.backgroundColor = colorPicker.value;
  document.documentElement.style.setProperty(
    '--square-color',
    squarePicker.value
  );
});

const mainPicker = document.getElementById('mainPicker');
mainPicker.addEventListener('input', () => {
  //body.style.backgroundColor = colorPicker.value;
  document.documentElement.style.setProperty('--main-color', mainPicker.value);
});

const secondaryPicker = document.getElementById('secondaryPicker');
secondaryPicker.addEventListener('input', () => {
  //body.style.backgroundColor = colorPicker.value;
  document.documentElement.style.setProperty(
    '--secondary-color',
    secondaryPicker.value
  );
});

const fontPicker = document.getElementById('fontPicker');
fontPicker.addEventListener('input', () => {
  //body.style.backgroundColor = colorPicker.value;
  document.documentElement.style.setProperty('--font-color', fontPicker.value);
});

const sliderPicker = document.getElementById('sliderPicker');
sliderPicker.addEventListener('input', () => {
  //body.style.backgroundColor = colorPicker.value;
  document.documentElement.style.setProperty(
    '--slider-color',
    sliderPicker.value
  );
});

const imageUpload = document.getElementById('imageUpload');
const deleteImageBtn = document.getElementById('deleteImage');

// Check for uploaded image and use it as background
imageUpload.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
      deleteImageBtn.style.display = 'block'; // Show delete button
    };

    reader.readAsDataURL(file);
  }
});

// Delete the uploaded image and reset background
deleteImageBtn.addEventListener('click', function () {
  document.body.style.backgroundImage = ''; // Reset background
  imageUpload.value = ''; // Clear the file input
  deleteImageBtn.style.display = 'none'; // Hide delete button
});

document
  .getElementById('exportSettings')
  .addEventListener('click', exportSettings);

async function exportSettings() {
  const colors = {
    bgColor: document.getElementById('bgPicker').value,
    squareColor: document.getElementById('squarePicker').value,
    mainColor: document.getElementById('mainPicker').value,
    secondaryColor: document.getElementById('secondaryPicker').value,
    fontColor: document.getElementById('fontPicker').value,
    sliderColor: document.getElementById('sliderPicker').value,
    uploadedImage: null, // Placeholder for image data
  };

  const imageFile = document.getElementById('imageUpload').files[0];

  if (imageFile) {
    const reader = new FileReader();
    const imgData = await new Promise((resolve) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.readAsDataURL(imageFile); // Convert image to base64
    });

    colors.uploadedImage = imgData; // Store base64 image in the settings
  }

  const jsonData = JSON.stringify(colors);

  const zip = new JSZip();
  zip.file('settings.json', jsonData);

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'settings.zip';
    link.click();
  });
}

document.getElementById('importBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('importSettings');
  if (fileInput.files.length > 0) {
    const zipFile = fileInput.files[0];
    importSettings(zipFile);
  }
});

async function importSettings(file) {
  const zip = await JSZip.loadAsync(file);

  // Read the settings.json file
  const jsonFile = await zip.file('settings.json').async('string');
  const settings = JSON.parse(jsonFile);

  // Apply colors
  document.getElementById('bgPicker').value = settings.bgColor;
  document.getElementById('squarePicker').value = settings.squareColor;
  document.getElementById('mainPicker').value = settings.mainColor;
  document.getElementById('secondaryPicker').value = settings.secondaryColor;
  document.getElementById('fontPicker').value = settings.fontColor;
  document.getElementById('sliderPicker').value = settings.sliderColor;

  // Apply the color changes in real-time
  document.documentElement.style.setProperty('--bg-color', settings.bgColor);
  document.documentElement.style.setProperty(
    '--square-color',
    settings.squareColor
  );
  document.documentElement.style.setProperty(
    '--main-color',
    settings.mainColor
  );
  document.documentElement.style.setProperty(
    '--secondary-color',
    settings.secondaryColor
  );
  document.documentElement.style.setProperty(
    '--font-color',
    settings.fontColor
  );
  document.documentElement.style.setProperty(
    '--slider-color',
    settings.sliderColor
  );

  // If a base64 image exists, load it
  if (settings.uploadedImage) {
    const imgElement = document.querySelector('.image-container img');
    imgElement.src = settings.uploadedImage;

    // Optionally, set it as the background image
    document.body.style.backgroundImage = `url(${settings.uploadedImage})`;

    // Show the delete image button
    document.getElementById('deleteImage').style.display = 'block';
  } else {
    console.error('No image data found in the settings');
  }
}
document.getElementById('importParticlesBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('importParticles');
  if (fileInput.files.length > 0) {
    const particleFile = fileInput.files[0];
    importParticles(particleFile);
  }
});

async function importParticles(file) {
  const text = await file.text();

  try {
    // Clear the current particles if they exist
    particlesJS('particles-js', {}); // Clear current particles

    // Log to confirm the content of the imported file
    console.log('Imported particles script:', text);

    // Evaluate the uploaded JavaScript code
    eval(text); // Execute the JavaScript code in the file

    // Check if particlesConfig is defined
    if (typeof particlesConfig !== 'undefined') {
      // Log to confirm particlesConfig is correctly loaded
      console.log('particlesConfig loaded successfully:', particlesConfig);

      // Initialize the particles with the new configuration
      particlesJS('particles-js', particlesConfig);
    } else {
      console.error(
        'The particles configuration was not found in the imported file.'
      );
    }
  } catch (error) {
    console.error('Failed to import particles configuration:', error);
  }
}
