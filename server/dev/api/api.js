import userRoutes from './user/userRoutes';
import blogRoutes from './blog/blogRoutes';
import loginRoutes from './login/loginRoutes';

// passport.use middleware
import passportAuthStrategies from './auth/auth';

export default app => {
  // strategies have to be placed before routes
  // because routes use strategis via passport.authenticate('strategyName')
  passportAuthStrategies();

  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/login', loginRoutes);
};