const router = require('express').Router();
import ctrls from './blogCtrls';

const getRoutes = () => {
  router.route('/')
    .get(ctrls.getBlogs)
    .post(ctrls.postBlog);

  router.route('/:id')
    .get(ctrls.getBlog)
    .put(ctrls.putBlog)
    .delete(ctrls.deleteBlog);

  return router;
};

export default app => app.use('/blog', getRoutes());