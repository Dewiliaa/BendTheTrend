console.log('Need to wait');

// Loads for 10 secs before going to summary.
setTimeout(function() {
  console.log('setting window location');
  window.location.href = "/HTML/Summary.html";
}, 10000);
