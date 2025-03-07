module.exports = {
    extends: 'next/core-web-vitals',
    rules: {
      '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
      '@typescript-eslint/no-explicit-any': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
      // Add other rules you want to disable during production
    },
  };