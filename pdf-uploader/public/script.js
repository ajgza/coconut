const form = document.getElementById('uploadForm');
const statusText = document.getElementById('uploadStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (result.success) {
    fileNamePreview.textContent = ''; // This clears the filename

    statusText.innerHTML = `<div class="success-banner"> PDF Uploaded Successfully!</div>`;
    

    setTimeout(() => {
      statusText.innerHTML = '';
    }, 5000);
  }
});

const fileInput = document.getElementById('fileInput');
const fileNamePreview = document.getElementById('fileNamePreview');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileNamePreview.textContent = `Selected file: ${fileInput.files[0].name}`;
  } else {
    fileNamePreview.textContent = '';
  }
});
