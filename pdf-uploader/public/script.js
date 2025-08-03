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
  console.log(result);


  if (result.success) {
    statusText.innerHTML = `<div class="success-banner">PDF "${result.title}" uploaded successfully!</div>`;

    // Clear preview and form
    setTimeout(() => {
      statusText.innerHTML = '';
      form.reset();
      document.getElementById('fileNamePreview').textContent = '';
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

window.addEventListener('DOMContentLoaded', async () => {
    const fileList = document.getElementById('uploadedFileList');
  
    try {
      const response = await fetch('/uploaded-files');
      const files = await response.json();
  
      if (Array.isArray(files) && files.length > 0) {
        files.forEach(file => {
          const link = document.createElement('a');
          link.href = `/uploads/${file}`;
          link.textContent = file;
          link.target = '_blank';
  
          const listItem = document.createElement('li');
          listItem.appendChild(link);
          fileList.appendChild(listItem);
        });
      } else {
        fileList.innerHTML = '<li>No PDFs uploaded yet.</li>';
      }
    } catch (err) {
      console.error('Error loading uploaded PDFs:', err);
      fileList.innerHTML = '<li>Error loading files.</li>';
    }
  });

  