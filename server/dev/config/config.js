const port = process.env.PORT || 8080;
const url = process.env.NODE_ENV === 'production'
              ? `https://frozen-shore-58330.herokuapp.com`
              : `http://localhost:${port}`;

export default {
  port,
  url
};


