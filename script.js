const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const galleryContainer = document.getElementById('galleryContainer');
const uploadButton = document.getElementById('uploadButton');
const fontForm = document.getElementById('fontForm');
const fontDisplay = document.getElementById('fontDisplay');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

// Remove highlight when item is dragged away
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);
dropArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', handleFiles);

// Handle upload button click
uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        handleFiles({ target: { files } });
    }
});

// Handle font form submission
fontForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fontName = document.getElementById('fontName').value;
    const fontSize = document.getElementById('fontSize').value;

    const fontInfo = document.createElement('div');
    fontInfo.style.fontFamily = fontName;
    fontInfo.style.fontSize = ${fontSize}px;
    fontInfo.textContent = Sample Text in ${fontName} (${fontSize}px);
    
    fontDisplay.innerHTML = ''; // Clear previous font info
    fontDisplay.appendChild(fontInfo);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles({ target: { files } });
}

function handleFiles({ target: { files } }) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const previewItem = document.createElement('div');
            previewItem.classList.add('preview-item');

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = event.target.result;
                previewItem.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = event.target.result;
                video.controls = true; // Add controls for video playback
                previewItem.appendChild(video);
            }

            galleryContainer.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

