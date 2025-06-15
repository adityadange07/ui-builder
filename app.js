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

  // Calculate which column and row the drop happened in
  const canvasRect = canvas.getBoundingClientRect();
  const colWidth = canvas.offsetWidth / 12;
  const rowHeight = 60; // Same as grid-auto-rows

  const col = Math.floor((x - canvasRect.left) / colWidth) + 1;
  const row = Math.floor((y - canvasRect.top) / rowHeight) + 1;

  // Create the new element
  const newEl = document.createElement('div');
  newEl.className = 'grid-item';
  newEl.style.gridColumn = col;
  newEl.style.gridRow = row;
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

  canvas.appendChild(newEl);
}
