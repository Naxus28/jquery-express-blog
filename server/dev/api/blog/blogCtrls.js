import blogModel from './blogModel';

export default {
  getBlogs(req, res) {
    res.json(blogModel.get());
  },
  getBlog(req, res) {
    res.json(blogModel.get(req.params.id));
  },
  postBlog(req, res) {
    res.json(blogModel.create(req.body));
  },
  putBlog(req, res) {
    res.json(blogModel.update(req.body));
  },
  deleteBlog(req, res) {
    res.json(blogModel.delete(req.params.id));
  }
};