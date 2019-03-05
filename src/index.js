import simpleValidator from "./simpleValidator";
import options from "./options";
import "./styles.css";

/// Testing Implementation
// For each form you want to run against, run a new 'validate form'.
const aform = simpleValidator(document.querySelector("#addTourForm"), options);
const bform = simpleValidator(document.querySelector("#simplerForm"), options);

document.querySelector(".submit").addEventListener("click", () => {
  // Call this whenever you want to validate things.
  aform.validate();

  // If you need to know what errors are there, call this util method.
  console.log("What errors?", aform.getErrors());

  // A simple check against the form when you submit so it won't continue.
  if (aform.hasErrors()) {
    console.error("Don't submit.");
    return;
  } else {
    console.log("Do submit.");
  }
});

document
  .querySelector(".submit-simple")
  .addEventListener("click", () => bform.validate());
