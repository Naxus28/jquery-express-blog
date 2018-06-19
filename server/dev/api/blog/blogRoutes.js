const router = require('express').Router();

import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from './blogCtrls';

router.route('/')
  .get(getBlogPosts)
  .post(createBlogPost);

 router.route('/:slug')
  .get(getBlogPost)

router.route('/:id')
  .put(updateBlogPost)
  .delete(deleteBlogPost);

export default router;