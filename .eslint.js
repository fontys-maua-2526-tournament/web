export const env = {
  browser: true,
  es2021: true,
};
export const eslintExtends = [
  'eslint:recommended', // Standard ESLint rules
  'plugin:react/recommended', // React best practices
  'plugin:react-hooks/recommended', // Rules for React Hooks (crucial!)
  'plugin:import/recommended',
];
export const parserOptions = {
  ecmaFeatures: {
    jsx: true, // Enable JSX support
  },
  ecmaVersion: 12, // Use ECMAScript 2021
  sourceType: 'module', // Use ES Modules
};
export const plugins = ['react', 'react-hooks', 'import'];
export const rules = {
  'no-undef': 'off',
  // --- Common Error Detection Rules ---
  // Enforces array-callback-return (good for array methods)
  'array-callback-return': 'error',
  // Disallow use of console (helpful for production)
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  // Require let or const instead of var
  'no-var': 'error',
  // Enforce strict equality checks (=== and !==)
  eqeqeq: ['error', 'always'],

  // --- React-Specific Rules ---
  // CRITICAL: Catches missing dependencies in useEffect/useCallback/useMemo
  'react-hooks/exhaustive-deps': 'warn',
  // CRITICAL: Catches common Hook rule violations (e.g., calling hooks conditionally)
  'react-hooks/rules-of-hooks': 'error',
  // Disallow usage of undeclared variables in JSX
  'react/jsx-no-undef': 'error',
  // Disallow using children as props and re-passing them (often leads to bugs)
  'react/no-children-prop': 'error',
  // Ensure PropTypes are not required if you are using TypeScript or a similar system
  // If you're using plain JS, you might change this to 'error' or 'warn'
  'react/prop-types': 'off',
  // 1. **CRITICAL:** Ensures imports point to a file/module that exists
  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],

  // 2. **CRITICAL:** Detects if a named import (e.g., `{ Component }`) doesn't exist in the imported module
  'import/named': 'error',

  // 3. **CRITICAL:** Ensures default exports are imported with the correct syntax
  'import/default': 'error',

  // 4. Catches instances where you import a dependency that isn't listed in package.json
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: false, // You might allow dev dependencies in config/test files
      optionalDependencies: false,
      peerDependencies: false,
    },
  ],

  // 5. Detects imports that are defined but never used (reduces bundle size)
  'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],

  // 6. Prefer default export when there is only one export
  'import/prefer-default-export': 'off', // Often turned off for flexibility

  // 7. Disallow importing the same module multiple times
  'import/no-duplicates': 'warn',
};
export const settings = {
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  react: {
    version: 'detect',
  },
};
