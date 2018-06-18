import userRoutes from './user/userRoutes';
import blogRoutes from './blog/blogRoutes';
import loginRoutes from './login/loginRoutes';

// passport.use middleware
import authStrategies from './auth/strategies';

export default app => {
  // strategies have to be placed before routes
  // because routes use strategis via passport.authenticate('strategyName')
  authStrategies();

  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/login', loginRoutes);
};