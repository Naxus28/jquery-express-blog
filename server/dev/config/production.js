export default {
  logging: true,
  db: {
    url: process.env.MONGODB_URI // check heroku env variables
  },
  url: 'https://frozen-shore-58330.herokuapp.com'
};