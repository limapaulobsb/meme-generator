// Project also inspired by this great video on dcode YouTube channel
// https://www.youtube.com/watch?v=io5FcMAdLyQ

// =====> Start Global Variables <=====
let imageElement;

const colorInputs = document.querySelectorAll('input[type="color"]');
const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');

// =====> End Global Variables <=====
// =====> Start Function Declarations <=====

function updateCanvas() {
  const canvasElement = document.querySelector('canvas');
  const ctx = canvasElement.getContext('2d');

  const { height, width } = imageElement;
  const fontSize = Math.floor(width / 15);
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;
  const yOffset = height / 25;

  // Add canvas background
  canvasElement.height = height;
  canvasElement.width = width;
  ctx.drawImage(imageElement, 0, 0);

  // Set text configuration
  ctx.font = `${fontSize}px Verdana`;
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.textAlign = 'center';

  // Add top text
  ctx.fillStyle = colorInputs[0].value;
  ctx.strokeStyle = colorInputs[1].value;
  ctx.textBaseline = 'top';
  ctx.strokeText(topText, width / 2, yOffset); // Must render first
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.fillStyle = colorInputs[2].value;
  ctx.strokeStyle = colorInputs[3].value;
  ctx.textBaseline = 'bottom';
  ctx.strokeText(bottomText, width / 2, height - yOffset); // Must render first
  ctx.fillText(bottomText, width / 2, height - yOffset);
}

function loadImage(source) {
  imageElement = document.createElement('img');
  imageElement.src = source;
  imageElement.addEventListener('load', updateCanvas, { once: true });
}

// =====> End Function Declarations <=====
// =====> Start Onload Events and Listeners setup <=====

window.onload = () => {
  const imageInput = document.getElementById('image-input');
  const exampleImages = document.querySelectorAll('.example-image');

  imageInput.addEventListener('change', () => {
    const source = URL.createObjectURL(imageInput.files[0]);
    loadImage(source);
  });

  exampleImages.forEach((el) => {
    el.addEventListener('click', () => loadImage(el.src));

    el.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') loadImage(el.src);
    });
  });

  colorInputs.forEach((el) => el.addEventListener('input', updateCanvas));
  topTextInput.addEventListener('input', updateCanvas);
  bottomTextInput.addEventListener('input', updateCanvas);
};

// =====> End Onload Events and Listeners setup <=====
