import express from 'express';
import mongoose from 'mongoose';

// config
import config from './config/config';

// middleware
import appMiddleware from './middleware/appMiddleware';
import fourZeroFour from './api/fourZeroFour/fourZeroFour';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

// passport.use middleware
import passportAuthStrategies from './api/auth/auth';

// api
import api from './api/api.js';

// start db
mongoose.connect(config.db.url)
  .then(
    conn => console.log('Mongoose connected'),
    err => console.log(`Mongoose error: ${err}`)
  );

const app = express();

appMiddleware(app, express);
// strategies have to be placed before routes
// because routes use strategis via passport.authenticate('strategyName')
passportAuthStrategies(); 
api(app);
fourZeroFour(app);
errorHandlerMiddleware(app);

app.listen(config.port, () =>
  console.log(`Server listening at ${config.url}`));

export default app;