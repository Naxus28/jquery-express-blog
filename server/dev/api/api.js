import userRoutes from './user/userRoutes';
import blogRoutes from './blog/blogRoutes';
import loginRoutes from './login/loginRoutes'

export default app => {
  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/login', loginRoutes);
};