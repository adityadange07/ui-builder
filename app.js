function allowDrop(e) {
  e.preventDefault();
}

document.querySelectorAll(".tool").forEach(tool => {
  tool.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("component-type", e.target.dataset.type);
  });
});

function drop(e) {
  e.preventDefault();
  const type = e.dataTransfer.getData("component-type");

  let element;
  switch (type) {
    case "button":
      element = document.createElement("button");
      element.innerText = "Click Me";
      break;
    case "input":
      element = document.createElement("input");
      element.placeholder = "Enter text";
      break;
    case "div":
      element = document.createElement("div");
      element.innerText = "Container";
      element.style.border = "1px dashed #333";
      element.style.padding = "10px";
      break;
  }

  element.setAttribute("data-type", type);
  element.setAttribute("contenteditable", true);
  e.target.appendChild(element);
}

function generateCode() {
  const canvas = document.getElementById("canvas").cloneNode(true);
  canvas.querySelectorAll("[contenteditable]").forEach(el => el.removeAttribute("contenteditable"));
  document.getElementById("code").innerText = canvas.innerHTML;
}
