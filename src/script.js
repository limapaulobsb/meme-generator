// =====> Start Global Variables <=====

const imageInput = document.getElementById('image-input');
const topTextInput = document.getElementById('top-text-input');
const bottomTextInput = document.getElementById('bottom-text-input');
const colorInputs = document.querySelectorAll('input[type="color"]');
const canvasElement = document.querySelector('canvas');
const ctx = canvasElement.getContext('2d');

let imageElement;

// =====> End Global Variables <=====
// =====> Start Function Declarations <=====

function updateCanvas() {
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
  ctx.fillStyle = colorInputs[1].value;
  ctx.strokeStyle = colorInputs[0].value;
  ctx.textBaseline = 'top';
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.fillStyle = colorInputs[3].value;
  ctx.strokeStyle = colorInputs[2].value;
  ctx.textBaseline = 'bottom';
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}

// =====> End Function Declarations <=====
// =====> Start Onload Events and Listeners setup <=====

window.onload = () => {
  imageInput.addEventListener('change', () => {
    imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(imageInput.files[0]);
    imageElement.addEventListener('load', updateCanvas, { once: true });
  });

  bottomTextInput.addEventListener('input', updateCanvas);
  topTextInput.addEventListener('input', updateCanvas);
  colorInputs.forEach((el) => el.addEventListener('input', updateCanvas));
};

// =====> End Onload Events and Listeners setup <=====
