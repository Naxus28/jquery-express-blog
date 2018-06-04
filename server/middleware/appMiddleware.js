import morgan from 'morgan';
import cors from 'cors';

export default (app, express) => {
  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());
  // app.use(express.urlencoded({ extended: true })); // for url encoded form data
};