import express from 'express';

// config
import config from './config/config';

// middleware
import appMiddleware from './middleware/appMiddleware';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

// routes
import blogRoutes from './api/blog/blogRoutes';

const app = express();

appMiddleware(app, express);

blogRoutes(app);

errorHandlerMiddleware(app);

app.listen(config.port, () =>
  console.log(`Server listening at ${config.url}`));

export default app;