export default {
  logging: true,
  db: {
    url: 'mongodb://localhost/blog-dev'
  },
  url: `http://localhost:${process.env.PORT || 8080}` 
};