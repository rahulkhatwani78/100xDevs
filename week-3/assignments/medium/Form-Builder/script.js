const submitForm = () => {
  const formPreviewFieldLabels = document.querySelectorAll(
    ".formPreviewFieldLabels"
  );
  const formPreviewFields = document.querySelectorAll(".formPreviewFields");
  document.querySelector("#previewAreaError").innerHTML = "";
  document.querySelector("#formSubmitted").innerHTML = "";

  const submittedValues = {};

  formPreviewFields.forEach((field, index) => {
    let value = "";
    if (field?.type === "checkbox") {
      value = field?.checked;
    } else {
      value = field?.value;
    }
    submittedValues[formPreviewFieldLabels[index]?.innerHTML?.trim()] = value;
  });

  const radioFieldLabels = document.querySelectorAll(".radioFieldLabels");
  radioFieldLabels.forEach((radioFieldLabel) => {
    const radioLabel = radioFieldLabel?.innerHTML?.trim() || "";
    const value =
      document.querySelector(`input[name="${radioLabel}"]:checked`)?.value ||
      "";
    submittedValues[radioLabel] = value;
  });

  let anyError = false;
  Object.values(submittedValues).forEach((value) => {
    if (value === "") {
      anyError = true;
    }
  });

  if (Object.keys(submittedValues).length === 0) {
    document.querySelector("#previewAreaError").innerHTML =
      "Please add atleast one field before submitting!";
    return;
  }

  if (anyError) {
    document.querySelector("#previewAreaError").innerHTML =
      "Please fill up the form before submitting!";
    return;
  }

  console.log(submittedValues);
  document.querySelector("#formSubmitted").innerHTML = "Form Submitted!";
};

const loadInputField = (inputType) => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "formPreviewElement");

  const formLabel = document.createElement("span");
  formLabel.setAttribute("class", "formPreviewFieldLabels");
  formLabel.innerHTML = document.querySelector("#fieldLabel").value + " ";

  const inputElement = document.createElement("input");
  inputElement.setAttribute("class", "formPreviewFields");
  inputElement.setAttribute("type", inputType);

  if (inputType === "checkbox") {
    divElement.appendChild(inputElement);
    divElement.appendChild(formLabel);
  } else {
    divElement.appendChild(formLabel);
    divElement.appendChild(inputElement);
  }

  return divElement;
};

const loadSelectField = () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "formPreviewElement");

  const formLabel = document.createElement("span");
  formLabel.setAttribute("class", "formPreviewFieldLabels");
  formLabel.innerHTML = document.querySelector("#fieldLabel").value + " ";

  const selectElement = document.createElement("select");
  selectElement.setAttribute("class", "formPreviewFields");

  const optionLabels = document.querySelectorAll(".optionLabel");
  optionLabels.forEach((optionLabel) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", optionLabel?.value);
    optionElement.innerHTML = optionLabel?.value;
    selectElement.appendChild(optionElement);
  });

  divElement.appendChild(formLabel);
  divElement.appendChild(selectElement);

  return divElement;
};

const loadRadioField = () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "formPreviewElement");

  const formLabel = document.createElement("h3");
  formLabel.setAttribute("class", "radioFieldLabels");
  formLabel.innerHTML = document.querySelector("#fieldLabel").value + " ";

  divElement.appendChild(formLabel);

  const optionLabels = document.querySelectorAll(".optionLabel");
  optionLabels.forEach((optionLabel, index) => {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "radio");
    inputElement.setAttribute("name", formLabel.innerHTML?.trim());
    inputElement.setAttribute("id", `${optionLabel?.value}-${index + 1}`);
    inputElement.setAttribute("value", optionLabel?.value);

    const labelElement = document.createElement("label");
    labelElement.innerHTML = optionLabel?.value;
    labelElement.setAttribute("for", `${optionLabel?.value}-${index + 1}`);

    divElement.appendChild(inputElement);
    divElement.appendChild(labelElement);
  });

  return divElement;
};

const loadHeadingField = () => {
  const divElement = document.createElement("div");
  divElement.setAttribute("class", "formPreviewElement");

  const headingLabel = document.createElement("h3");
  headingLabel.innerHTML = document.querySelector("#fieldLabel").value + " ";

  divElement.appendChild(headingLabel);

  return divElement;
};

const appendInPreviewArea = () => {
  const fieldType = document.querySelector("#fieldType").value;
  const formPreview = document.querySelector(".formPreview");
  let fieldElement = "";
  if (fieldType === "heading") {
    fieldElement = loadHeadingField();
  } else if (fieldType === "textInput") {
    fieldElement = loadInputField("text");
  } else if (fieldType === "passwordInput") {
    fieldElement = loadInputField("password");
  } else if (fieldType === "selectInput") {
    fieldElement = loadSelectField();
  } else if (fieldType === "checkboxInput") {
    fieldElement = loadInputField("checkbox");
  } else if (fieldType === "radioInput") {
    fieldElement = loadRadioField();
  }
  formPreview.appendChild(fieldElement);
};

const addField = () => {
  const fieldType = document.querySelector("#fieldType").value;
  document.querySelector("#error").innerHTML = "";
  document.querySelector("#previewAreaError").innerHTML = "";
  document.querySelector("#formSubmitted").innerHTML = "";
  if (fieldType === "-1") {
    document.querySelector("#error").innerHTML = "Please select the field type";
    return;
  }

  const fieldLabel = document.querySelector("#fieldLabel").value;
  if (fieldLabel?.trim() === "") {
    document.querySelector("#error").innerHTML = "Please enter the field label";
    return;
  }

  if (fieldType === "selectInput" || fieldType === "radioInput") {
    const optionLabels = document.querySelectorAll(".optionLabel");
    optionLabels.forEach((optionLabel) => {
      if (optionLabel?.value?.trim() === "") {
        document.querySelector("#error").innerHTML =
          "Please enter the option labels";
      }
    });
  }

  appendInPreviewArea();
  document.querySelector("#fieldType").value = "-1";
  onFieldTypeChange();
};

const loadFieldLabel = () => {
  const fieldLabels = document.querySelector("#fieldLabels");
  document.querySelector("#error").innerHTML = "";

  const h2Element = document.createElement("h2");
  h2Element.innerHTML = "Field Label";

  const inputElement = document.createElement("input");
  inputElement.setAttribute("id", "fieldLabel");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeHolder", "Enter field label");

  fieldLabels.appendChild(h2Element);
  fieldLabels.appendChild(inputElement);
};

const removeOptionLabel = (id) => {
  const fieldOptions = document.querySelector("#fieldOptions");
  document.querySelector("#error").innerHTML = "";

  fieldOptions.lastChild.remove(); // To delete the current add button

  const addButtonElement = document.createElement("button");
  addButtonElement.setAttribute("id", "addOptionLabel");
  addButtonElement.innerHTML = "+";
  addButtonElement.setAttribute("onclick", `loadFieldOptions(${id})`);

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.setAttribute("id", "removeOptionLabel");
  deleteButtonElement.innerHTML = "-";
  deleteButtonElement.setAttribute("onclick", `removeOptionLabel(${id - 1})`);

  fieldOptions.lastChild.appendChild(addButtonElement); // To append the add button

  if (id - 1 > 1) {
    fieldOptions.lastChild.appendChild(deleteButtonElement); // To append the remove button
  }
};

const loadFieldOptions = (id) => {
  const fieldOptions = document.querySelector("#fieldOptions");
  document.querySelector("#error").innerHTML = "";

  const fieldOption = document.createElement("div");
  fieldOption.setAttribute("id", `option${id}`);

  const h2Element = document.createElement("h2");
  h2Element.innerHTML = `Field Option-${id} Label`;

  const inputElement = document.createElement("input");
  inputElement.setAttribute("class", "optionLabel");
  inputElement.setAttribute("id", `optionLabel${id}`);
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeHolder", `Enter option-${id} label`);

  const addButtonElement = document.createElement("button");
  addButtonElement.setAttribute("id", "addOptionLabel");
  addButtonElement.innerHTML = "+";
  addButtonElement.setAttribute("onclick", `loadFieldOptions(${id + 1})`);

  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.setAttribute("id", "removeOptionLabel");
  deleteButtonElement.innerHTML = "-";
  deleteButtonElement.setAttribute("onclick", `removeOptionLabel(${id})`);

  if (id > 1) {
    fieldOptions.lastChild.lastChild.remove(); // To delete the previous add button
  }
  if (id > 2) {
    fieldOptions.lastChild.lastChild.remove(); // To delete the previous remove button
  }

  fieldOption.appendChild(h2Element);
  fieldOption.appendChild(inputElement);
  fieldOption.appendChild(addButtonElement);
  if (id > 1) {
    fieldOption.appendChild(deleteButtonElement); // To append the remove button for 2nd options onwards
  }

  fieldOptions.appendChild(fieldOption);
};

const onFieldTypeChange = () => {
  document.querySelector("#fieldLabels").innerHTML = "";
  document.querySelector("#fieldOptions").innerHTML = "";
  const fieldType = document.querySelector("#fieldType").value;
  if (fieldType !== "-1") {
    loadFieldLabel();
  }
  if (fieldType === "selectInput" || fieldType === "radioInput") {
    loadFieldOptions(1);
  }
};
