let draggedCanvasElement = null;

document.querySelectorAll('.tool').forEach(tool => {
  tool.addEventListener('dragstart', event => {
    event.dataTransfer.setData('type', tool.dataset.type);
  });
});

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const type = event.dataTransfer.getData('type');
  const canvas = document.getElementById('canvas');

  const x = event.clientX;
  const y = event.clientY;

  const canvasRect = canvas.getBoundingClientRect();
  const colWidth = canvas.offsetWidth / 12;
  const rowHeight = 60;

  const col = Math.floor((x - canvasRect.left) / colWidth) + 1;
  const row = Math.floor((y - canvasRect.top) / rowHeight) + 1;

  if (type === 'canvas-move' && draggedCanvasElement) {
    draggedCanvasElement.style.gridColumn = col;
    draggedCanvasElement.style.gridRow = row;
    draggedCanvasElement = null;
    return;
  }

  // Original drop logic for new elements
  const newEl = document.createElement('div');
  newEl.className = 'grid-item';
  newEl.style.gridColumn = col;
  newEl.style.gridRow = row;
  newEl.setAttribute('draggable', true);
  newEl.addEventListener('dragstart', handleCanvasDragStart);
  newEl.textContent = type.charAt(0).toUpperCase() + type.slice(1);

  // Optionally create real HTML elements
  if (type === 'button') {
    const btn = document.createElement('button');
    btn.textContent = 'Button';
    newEl.innerHTML = '';
    newEl.appendChild(btn);
  } else if (type === 'input') {
    const input = document.createElement('input');
    input.placeholder = 'Input';
    newEl.innerHTML = '';
    newEl.appendChild(input);
  } else if (type === 'div') {
    const container = document.createElement('div');
    container.style.border = '1px solid #999';
    container.style.padding = '10px';
    container.textContent = 'Container';
    newEl.innerHTML = '';
    newEl.appendChild(container);
  }
  newEl.setAttribute('draggable', true);
  newEl.addEventListener('dragstart', handleCanvasDragStart);
  canvas.appendChild(newEl);
}

function handleCanvasDragStart(event) {
  draggedCanvasElement = event.target;
  event.dataTransfer.setData('type', 'canvas-move'); // So we know it's a move
}

function generateCode() {
  const codeContainer = document.getElementById('code');
  const canvas = document.getElementById('canvas');
  const elements = canvas.querySelectorAll('.grid-item');

  let htmlOutput = '';

  elements.forEach((el) => {
    const child = el.firstElementChild;

    if (child) {
      if (child.tagName === 'BUTTON') {
        htmlOutput += `<button>${child.textContent}</button>\n`;
      } else if (child.tagName === 'INPUT') {
        htmlOutput += `<input placeholder="${child.placeholder}" />\n`;
      } else if (child.tagName === 'DIV') {
        htmlOutput += `<div>${child.textContent}</div>\n`;
      }
    }
  });

  codeContainer.textContent = htmlOutput || '<!-- No components on canvas -->';
}
