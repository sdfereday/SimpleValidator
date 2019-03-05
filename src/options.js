export default {
  autoTracking: true, // If enabled will perform validation on current field upon change.
  rules: {
    // Rules are required here as functions with conditions within.
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
    requireSelected: function(str) {
      console.log(str);
    }
  },
  messages: {
    // For every rule you can specify a string, make sure the key name is the same as the methods.
    required: "This field is required.",
    isAlpha: "Must be letters only.",
    isAlphaNumeric: "Must be alphanumeric.",
    isName: "Name length must be no longer than 25 characters.",
    isExcerpt: "Excerpt length must be no longer than 120 characters.",
    isDescription: "Description length must be no longer than 1500 characters."
  }
};
