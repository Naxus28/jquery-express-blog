import express from 'express';

// middleware
import appMiddleware from './middleware/appMiddleware';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

// routes
import blogRoutes from './api/blog/blogRoutes';

const app = express();
const PORT = process.env.PORT || 8080;
const URL = process.env.NODE_ENV === 'production'
              ? `https://frozen-shore-58330.herokuapp.com/${PORT}`
              : `http://localhost:${PORT}`;

appMiddleware(app, express);

blogRoutes(app);

errorHandlerMiddleware(app);

app.listen(PORT, () =>
  console.log(`Server listening at ${URL}`));

export default app;