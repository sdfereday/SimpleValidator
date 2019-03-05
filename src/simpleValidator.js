export default (form, options, _errors = [], _hasRun = false) => {
  const uuidv4 = () => {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const removeAll = nodeList => {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].remove();
    }
  };

  const removeAllTooltips = cls => removeAll(form.querySelectorAll(cls));

  const makeErrorTooltip = (id, message) =>
    `<div id="tooltip-${id}" class="error" data-type="validator-error">${message}</div>`;

  const bindTooltip = ({ field, message }) =>
    field.insertAdjacentHTML(
      "afterend",
      makeErrorTooltip(field.dataset.validateId, message)
    );

  const validateField = field =>
    field.dataset.rule
      .split("|")
      .map(str => {
        const fn = options.rules[str];
        const message = options.messages[str];
        const isValid = fn(field.value);

        if (!field.dataset.validateId) {
          field.dataset.validateId = uuidv4();
        }

        return !isValid
          ? {
              fieldId: field.dataset.validateId,
              field,
              message: message ? message : "Invalid field."
            }
          : null;
      })
      .filter(x => x);

  const consolidateFirstError = field => {
    _hasRun = true;
    const errors = validateField(field);

    const errorsObject = {
      fieldId: field.dataset.validateId,
      errors,
      field
    };

    const existingTooltip = field.parentNode.querySelector(
      "#tooltip-" + field.dataset.validateId
    );

    if (existingTooltip) {
      existingTooltip.remove();
    }

    if (errors.length) {
      bindTooltip(errors[0]);
    } else {
      _errors = _errors.filter(x => x.fieldId !== field.dataset.validateId);
      return;
    }

    _errors = _errors.some(x => x.fieldId === errorsObject.fieldId)
      ? _errors
      : [errorsObject].concat(_errors);
  };

  const bindListeners = nodeList => {
    for (let i = 0; i < nodeList.length; i++) {
      const field = nodeList[i];
      field.addEventListener(
        "change",
        () => consolidateFirstError(field),
        true
      );
      field.addEventListener("blur", () => consolidateFirstError(field), true);
      field.addEventListener("keyup", () => consolidateFirstError(field), true);
    }
  };

  const fields = form.querySelectorAll("[data-rule]");

  if (options.autoTracking) {
    bindListeners(fields);
  }

  return {
    validate: () => {
      removeAllTooltips(".error");
      Array.from(fields).forEach(field => consolidateFirstError(field));
    },
    hasErrors: () => _errors.length || !_hasRun,
    getErrors: () => _errors
  };
};
