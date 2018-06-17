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

   router.route('/:slug')
    .get(getBlogPost)

  router.route('/:id')
    .put(updateBlogPost)
    .delete(deleteBlogPost);

  return router;
};

export default app => app.use('/blog', getRoutes());