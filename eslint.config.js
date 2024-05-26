import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
    singleQuote: true,
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'regexp/no-unused-capturing-group': 'off',
  },
});
