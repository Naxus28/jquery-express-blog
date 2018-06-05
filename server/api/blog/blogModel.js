import uuid from 'uuid';
import { StorageException } from '../../errorHandlers/exceptionClasses';
import { validateApiRequest } from '../apiHelpers';

// var to hold the post
const posts = [];

export default {
  create({ title, content, author, publishDate = Date.now(), id = uuid.v4() }) {
    
    // if request is invalid this function throws an exception
    validateApiRequest(arguments['0']); 

    const post = {
      id,
      title,
      content,
      author,
      publishDate
    };
    posts.push(post);

    return post;
  },
  get(id='') {
    // if there is an id, find specific post
    if (id) {
      return posts.find(post => post.id === id);
    }

    // if no id is passed, return all posts in achronological order
    return posts.sort((a, b) => b.publishDate - a.publishDate);
  },
  delete(id) {
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex > -1) {
      posts.splice(postIndex, 1);
      return { message: `post id=${id} was succesfully deleted`};
    } else {
      throw new StorageException(`Can't delete item \`${id}\` because it doesn't exist.`, 400);
    }
  },
  update(updatedPost) {
    const { id } = updatedPost;
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      throw new StorageException(`Can't update item \`${id}\` because it doesn't exist.`, 400);
    }

    // replace the old post with the new
    posts[postIndex] = updatedPost;

    // return the updated post
    return updatedPost;
  }
};

