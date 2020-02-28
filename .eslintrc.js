module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true,
    "jquery": false,
    "jest": true,
    "jasmine": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "2017"        
  },
  "rules": {
    "no-tabs": "off",
    "no-underscore-dangle": "off",
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "newline-before-return": "error",
    "space-before-blocks": "error",
    "no-console": 0,
  }
};