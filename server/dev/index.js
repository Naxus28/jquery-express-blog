import express from 'express';
import mongoose from 'mongoose';

// config
import config from './config/config';

// middleware
import appMiddleware from './middleware/appMiddleware';
import fourZeroFour from './api/fourZeroFour';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

// routes
import blogRoutes from './api/blog/blogRoutes';
import userRoutes from './api/user/userRoutes';

// start db
mongoose.connect(config.db.url)
  .then(
    conn => console.log('Mongoose connected'),
    err => console.log(`Mongoose error: ${err}`)
  );

const app = express();

appMiddleware(app, express);
blogRoutes(app);
userRoutes(app);
fourZeroFour(app);
errorHandlerMiddleware(app);


app.listen(config.port, () =>
  console.log(`Server listening at ${config.url}`));

export default app;