const config = {
  env: {
    isTest: () => process.env.NODE_ENV === 'test',
  },
};

export default config;
