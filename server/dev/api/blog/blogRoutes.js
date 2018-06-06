const router = require('express').Router();
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from './blogCtrls';

const getRoutes = () => {
  router.route('/')
    .get(getBlogPosts)
    .post(createBlogPost);

  router.route('/:id')
    .get(getBlogPost)
    .put(updateBlogPost)
    .delete(deleteBlogPost);

  return router;
};

export default app => app.use('/blog', getRoutes());