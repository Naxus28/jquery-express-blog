import userRoutes from './user/userRoutes';
import blogRoutes from './blog/blogRoutes';
import authRoutes from './auth/auth'

export default app => {
  app.use('/user', userRoutes);
  app.use('/blog', blogRoutes);
  app.use('/login', authRoutes);
};