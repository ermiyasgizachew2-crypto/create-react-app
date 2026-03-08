const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const blurButton = document.getElementById('blurButton');
const resetButton = document.getElementById('resetButton');
const downloadButton = document.getElementById('downloadButton');
const gallery = document.getElementById('gallery');

let image = new Image();

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

blurButton.addEventListener('click', () => {
    context.filter = 'blur(5px)';
    context.drawImage(image, 0, 0);
    addToGallery(canvas.toDataURL());
});

resetButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'blurred-image.png';
    link.href = canvas.toDataURL();
    link.click();
});

function addToGallery(dataUrl) {
    const img = document.createElement('img');
    img.src = dataUrl;
    gallery.appendChild(img);
}
