import BlogModel from './blogModel';
import User from '../user/userModel';
import { ApiException } from '../../../errorHandlers/exceptionClasses';
import { errorHandler } from '../../helpers/apiHelpers';

let blogPostParam = (req, res, next, id) => { 
  BlogModel.findById(id, (err, blogPost) => {
    if (err) {
      return errorHandler(err, next);
    } else if (blogPost) {
      req.blogPost = blogPost;
      next();
    } else {
      return errorHandler('Failed to load blogPost',ApiException, next);
    }
  })
};

const getBlogPosts = (req, res, next) => {
  BlogModel
    .find({})
    .sort({publishDate: 'desc'})
    .exec((err, blogPosts) => {
      if (err) return errorHandler(err, ApiException, next);

      if (!blogPosts.length) {
        return errorHandler({
          message: 'Resources not found', 
          status: 404
        }, ApiException, next);
      } 
      res.json(blogPosts);
    });
};

/**
 * get blog by slug retrieved from the friendly url displayed to the user
 * @param  {Object} req  
 * @param  {[Object res  
 * @param  {Function} next 
 * @return {undefined}        
 */
const getBlogPost = (req, res, next) => {
  BlogModel
  .findOne({slug: req.params.slug})
    // the name in populate() is the property created in the blogModel('user'), 
    // not the name given to the user model object ('User')
    // check http://mongoosejs.com/docs/populate.html
    // check https://medium.com/@nicknauert/mongooses-model-populate-b844ae6d1ee7
  .populate('user')
  .exec((err, blogPost) => {
    if (err) return errorHandler(err, ApiException, next);
    
    if (!blogPost) {
      return errorHandler({
        message: 'Resource not found', 
        status: 404
      }, ApiException, next);
    } 
    res.json(blogPost);
  });
};

const createBlogPost = (req, res, next) => {
  // create slug for friendly url
  req.body.slug = req.body.title.toLowerCase().split(' ').join('-')

  const newBlogPost = new BlogModel(req.body);

  newBlogPost.save((err, blogPost) => {
    if (err) return errorHandler(err, ApiException, next);

    console.log('blogPost._id: ', blogPost._id);

    // POST to /blog needs to have the user id (req.body.user = user._id)
    // so we can add the post id to the user document
    // 'user' is a mandatory value in blogModel 
    User.findOneAndUpdate({_id: req.body.author}, {$push: {blogPosts: blogPost._id}}, (err, user) => {
      if (err) return errorHandler(err, ApiException, next);
    });

    res.json(blogPost);
  });
};

const updateBlogPost = (req, res, next) => {
  req.body.updatedDate = Date.now();
  
  BlogModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }, (err, blogPost) => {
    if (err) return errorHandler(err, ApiException, next);
    res.json(blogPost);
  });
};

const deleteBlogPost = (req, res, next) => {
  BlogModel.findOneAndRemove({_id: req.params.id}, (err, blogPost) => {
    if (err) return errorHandler(err, ApiException, next);
    if (!Object.keys(blogPost).length) return errorHandler({
        message: 'Resource not found', 
        status: 404
      }, ApiException, next);
    res.json({message: `Blog post was successfuly deleted.`});
  });
};




export {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
};