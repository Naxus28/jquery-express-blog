import morgan from 'morgan';

export default (app, express) => {
  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true })); // for url encoded form data
};