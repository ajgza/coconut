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
        files.forEach(({ file, title }) => {
            const listItem = document.createElement('li');
            listItem.style.marginBottom = '20px';
          
            const topRow = document.createElement('div');
            topRow.style.display = 'flex';
            topRow.style.alignItems = 'center';
            topRow.style.justifyContent = 'space-between';
          
            const link = document.createElement('a');
            link.href = `/uploads/${file}`;
            link.textContent = title || file;
            link.target = '_blank';
            link.style.flexGrow = '1';
            link.style.fontWeight = 'bold';
          
            const trash = document.createElement('span');
            trash.innerHTML = '🗑️';
            trash.style.cursor = 'pointer';
            trash.title = 'Delete';
            trash.style.marginLeft = '10px';
          
            trash.addEventListener('click', async () => {
              if (confirm(`Delete "${title}"?`)) {
                const response = await fetch(`/delete-file?name=${encodeURIComponent(file)}`, {
                  method: 'DELETE'
                });
          
                const result = await response.json();
          
                if (result.success) {
                  listItem.remove();
                } else {
                  alert('Failed to delete the file.');
                }
              }
            });
          
            topRow.appendChild(link);
            topRow.appendChild(trash);
          
            const preview = document.createElement('embed');
            preview.src = `/uploads/${file}`;
            preview.type = 'application/pdf';
            preview.width = '100%';
            preview.height = '400px';
            preview.style.marginTop = '10px';
          
            listItem.appendChild(topRow);
            listItem.appendChild(preview);
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

  