export default {
  jwt: {
    secret: process.env.GUITA_APP_SECRET,
    expiresIn: '1d',
  },
};
