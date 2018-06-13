import morgan from 'morgan';
import cors from 'cors';

export default (app, express) => {
  app.use(express.static('public'));
  app.use(cors());
  app.use(express.json()); // for json form data
  app.use(express.urlencoded({ extended: true })); // for url encoded form data
  app.use(morgan('dev'));
};