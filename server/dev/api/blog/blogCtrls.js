import BlogModel from './blogModel';

let blogPostParam = (req, res, next, id) => { 
  BlogModel.findById(id, (err, blogPost) => {
    if (err) {
      return errorHandler(err, next);
    } else if (blogPost) {
      req.blogPost = blogPost;
      next();
    } else {
      return errorHandler('Failed to load blogPost', next);
    }
  })
};

const getBlogPosts = (req, res, next) => {
  BlogModel
    .find({})
    .sort({ publishDate: 'desc'})
    .exec((err, blogPost) => {
      if (err) return errorHandler(err, next);
      res.json(blogPost);
    });
};

const getBlogPost = (req, res, next) => {
  // get blog by slug retrieved from the friendly url
  // displayed to the user
  BlogModel.find({slug: req.params.slug}, (err, blogPost) => {
    if (err) return errorHandler(err, next);
    res.json(blogPost);
  });
};

const createBlogPost = (req, res, next) => {
  // create slug for friendly url
  req.body.slug = req.body.title.toLowerCase().split(' ').join('-')

  const newBlogPost = new BlogModel(req.body);

  newBlogPost.save((err, blogPost) => {
    if (err) return errorHandler(err, next);
    res.json(blogPost);
  });
};

const updateBlogPost = (req, res, next) => {
  req.body.updatedDate = Date.now();
  
  BlogModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }, (err, blogPost) => {
    if (err) return errorHandler(err, next);
    res.json(blogPost);
  });
};

const deleteBlogPost = (req, res, next) => {
  BlogModel.findOneAndRemove({_id: req.params.id}, (err, blogPost) => {
    if (err) return errorHandler(err, next);
    res.json({message: `Blog post ${blogPost.title} was successfuly deleted.`});
  });
};

const errorHandler = (err, next) => next(new Error(err));


export {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
};