import userRoutes from './resources/user/userRoutes';
import blogRoutes from './resources/blog/blogRoutes';
import loginRoutes from './login/loginRoutes';

// passport.use middleware
import startAuthStrategies from './auth/strategies';

export default app => {
  // strategies have to be placed before routes
  // because routes use strategies via passport.authenticate('strategyName')
  startAuthStrategies();

  app.use('/api/user', userRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/login', loginRoutes);
};