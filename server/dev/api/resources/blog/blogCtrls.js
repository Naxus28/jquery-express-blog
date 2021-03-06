import BlogModel from './blogModel';
import User from '../user/userModel';
import { ApiException, DatabaseException } from '../../../exceptions/exceptionClasses';
import { errorHandler } from '../../helpers/apiHelpers';

let blogPostParam = (req, res, next, id) => { 
  BlogModel.findById(id, (err, blogPost) => {
    if (err) {
      return errorHandler(err, next);
    } else if (blogPost) {
      req.blogPost = blogPost;
      next();
    } else {
      return errorHandler('Failed to load blogPost', ApiException, next);
    }
  })
};

const getBlogPosts = (req, res, next) => {
  BlogModel
    .find({})
    .sort({publishDate: 'desc'})
    .populate('author', 'email') // populates blog with 'author: {email: 'some@email.com'}'
    .exec((err, blogPosts) => {
      // err.codeName is generated by mongoose/mongo 
      if (err) return errorHandler(err.codeName, DatabaseException, next);

      if (!blogPosts.length) {
        return res
          .status(204)
          .json({
            message: 'No Content', 
          });
      } 

      // try to find a native way to
      // do this on mongoose
      // blogPosts = blogPosts.map(post => {
      //   post = post.toObject();
      //   post.author = post.author.email;
      //   post.author = post.author.email;
      //   return post;
      // })

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
    // the name in populate() is the property created in the blogModel('author'), 
    // not the name given to the user model object ('User')
    // check http://mongoosejs.com/docs/populate.html
    // check https://medium.com/@nicknauert/mongooses-model-populate-b844ae6d1ee7
  .populate('author', 'email')
  .exec((err, blogPost) => {
    // err.codeName is generated by mongoose/mongo
    if (err) return errorHandler(err.codeName, ApiException, next);
    
    if (!blogPost) {
      return errorHandler({
        message: 'Resource not found', 
        status: 404
      }, ApiException, next);
    } 

    // find a native way to do this using mongoose
    // blogPost = blogPost.toObject();
    // blogPost.author = blogPost.author.email
    res.json(blogPost);
  });
};

const createBlogPost = (req, res, next) => {
  // create slug for friendly url
  req.body.slug = req.body.title.toLowerCase().split(' ').join('-');

  new BlogModel(req.body).save((err, blogPost) => {
    if (err) return errorHandler(err, ApiException, next);

    // POST to /blog needs to have the user id (req.body.user = user._id)
    // so we can add the post id to the user document
    // 'user' is a mandatory value in blogModel 
    User.findOneAndUpdate({_id: req.body.author}, {$push: {blogPosts: blogPost._id}}, (err, user) => {
      // err.codeName is generated by mongoose/mongo
      if (err) return errorHandler(err.codeName, ApiException, next);
    });

    // ---optional way to save blogpost---
    // User.findById(req.body.user, (err, user) => {
    //   if (err) return errorHandler(err, next);
      
    //   // check http://mongoosejs.com/docs/populate.html#refs-to-children
    //   user.blogPosts.push(todo);
    //   user.save();
    // });

    res.json(blogPost);
  });
};

const updateBlogPost = (req, res, next) => {
  req.body.updatedDate = Date.now();
  req.body.slug = req.body.title.toLowerCase().split(' ').join('-');

  BlogModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
  .populate('author', 'email')
  .exec((err, blogPost) => {
      // err.codeName is generated by mongoose/mongo 
      if (err) return errorHandler(err.codeName, ApiException, next);
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