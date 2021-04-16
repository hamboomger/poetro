const config = {
  google: {
    clientId: () => process.env.GOOGLE_CLIENT_ID,
    clientSecret: () => process.env.GOOGLE_CLIENT_SECRET,
  },
  env: {
    isTest: () => process.env.NODE_ENV === 'test',
    hostUrl: () => process.env.HOST_URL ?? 'http://localhost',
  },
  tags: {
    defaultColor: () => process.env.DEFAULT_TAG_COLOR ?? '#bfe000',
  },
};

export default config;
