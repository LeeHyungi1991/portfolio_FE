module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'custom-event-name-casing': 'off',
    'no-unused-vars': 'off',
    'no-mutating-props': 'off',
    'no-unused-components': 'off',
    'no-reserved-component-names': 'off',
    'no-multi-word-component-names': 'off',
  }
}
