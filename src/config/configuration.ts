export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    mongodb: {
      uri: process.env.DATABASE_MONGODB_URI,
      name: process.env.DATABASE_MONGODB_NAME || 'example',
    },
  },
});
