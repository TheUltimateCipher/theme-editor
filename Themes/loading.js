function startLoading() {
  // Show the loading overlay
  const overlay = document.getElementById('loading-overlay');
  const vipCode = sessionStorage.getItem('VIP-CODE') === 'true'; // Check if the user is a VIP

  if (!vipCode) {
    overlay.style.display = 'flex';

    // Start progress bar
    const progressBar = document.getElementById('progress');
    let width = 0;
    progressBar.style.width = 0;

    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        stopLoading();
      } else {
        width += Math.floor(Math.random() * 10) + 1;
        progressBar.style.width = width + '%';
      }
    }, 75);
  } else {
    stopLoading();
  }
}

function stopLoading() {
  // Hide the loading overlay
  const overlay = document.getElementById('loading-overlay');
  overlay.style.display = 'none';
  process();
}
