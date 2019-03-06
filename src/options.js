export default {
  autoTracking: true, // If enabled, inputs will validate as they're typed in and changed.
  rules: {
    // List rules that map to the data-rule attr on inputs.
    required: function(str) {
      return str.length > 0;
    },
    isAlpha: function(str) {
      return /^[A-Z]$/i.test(str);
    },
    isAlphaNumeric: function(str) {
      return /^[a-z0-9]+$/i.test(str);
    },
    isName: function(str) {
      return str.length > 0 && str.length < 26;
    },
    isExcerpt: function(str) {
      return str.length > 0 && str.length < 121;
    },
    isDescription: function(str) {
      return str.length > 0 && str.length < 1501;
    },
    isValidEditor: function(str) {
      const stripped = str.replace(/(<([^>]+)>)/ig,"");
      return stripped.length > 0 && stripped.length < 1501;
    } 
  },
  messages: {
    // For every rule you can specify an error message, make sure the key is the same as method key so they pair.
    required: "This field is required.",
    isAlpha: "Must be letters only.",
    isAlphaNumeric: "Must be alphanumeric.",
    isName: "Name length must be no longer than 25 characters.",
    isExcerpt: "Excerpt length must be no longer than 120 characters.",
    isDescription: "Description length must be no longer than 1500 characters.",
    isValidEditor: "Editor is required and must be no longer than 1500 characters."
  }
};
