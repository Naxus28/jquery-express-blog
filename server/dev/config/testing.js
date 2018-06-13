export default {
  logging: true,
  db: {
    url: 'mongodb://localhost/blog-test'
  },
  url: `http://localhost:${process.env.PORT}` 
};