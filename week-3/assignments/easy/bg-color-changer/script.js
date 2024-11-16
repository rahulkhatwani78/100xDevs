const capitalizeFirstLetter = (str) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

const changeBackgroundColor = (color) => {
  if (color === "default") color = "white";
  document.querySelector(".main").style.backgroundColor = color;
  document.querySelector(".colorPalette").style.backgroundColor = "white";
};

const createColorPalette = () => {
  const colors = [
    "red",
    "yellow",
    "pink",
    "green",
    "purple",
    "blue",
    "default",
  ];
  const colorPalette = document.querySelector(".colorPalette");
  colorPalette.innerHTML = "";
  colors.forEach((color) => {
    const spanElement = document.createElement("span");
    spanElement.setAttribute("class", "color");
    spanElement.innerHTML = capitalizeFirstLetter(color);
    if (color === "default") color = "white";
    spanElement.style.backgroundColor = color;
    spanElement.setAttribute("onclick", `changeBackgroundColor('${color}')`);
    colorPalette.appendChild(spanElement);
  });

  const colorPickerSpan = document.createElement("span");
  colorPickerSpan.setAttribute("class", "color");
  colorPickerSpan.setAttribute("id", "colorPickerSpan");

  const colorPickerInput = document.createElement("input");
  colorPickerInput.setAttribute("type", "color");
  colorPickerInput.setAttribute("id", "colorPicker");
  colorPickerInput.setAttribute("name", "colorPicker");
  colorPickerInput.setAttribute(
    "onchange",
    "changeBackgroundColor(this.value)"
  );

  const colorPickerLabel = document.createElement("label");
  colorPickerLabel.setAttribute("for", "colorPicker");
  colorPickerLabel.setAttribute("id", "colorPickerLabel");
  colorPickerLabel.innerHTML = "Custom";

  colorPickerSpan.appendChild(colorPickerInput);
  colorPickerSpan.appendChild(colorPickerLabel);

  colorPalette.appendChild(colorPickerSpan);
};

createColorPalette();
