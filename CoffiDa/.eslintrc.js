module.exports = {
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "airbnb/whitespace",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "ecmaFeatures": {
    "classes": true
  },
  "rules": {
    "semi" : "error",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
  }
};
