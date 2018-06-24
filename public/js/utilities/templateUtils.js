/**
 * BUILD POST HTML
 * @param  {Array} blogPosts
 * @return {DOM Node(s)}
 */
const buildPostsHTML = post => ( 
  `<div class="post-container" id="${post._id}">
    <div class="blog-post__header">
      <h1 class="blog-post__title">${post.title}</h1>
    </div>
    <input class="blog-post__author-id" type="hidden" value="${post.author._id}">
    <h3 class="blog-post__author">
      ${post.author.email}
    </h3>
    <p class="blog-post__content">
      ${post.content}
    </p>
    <div class="blog-post__dates-container">
      <span class="date">Published: ${formatDateForPost(post.publishDate)}</span>
      ${post.updatedDate &&
        `<span class="date">Last update: ${formatDateForPost(post.updatedDate)}</span>`
      }
    </div>
    <div class="blog-post__footer">
      <div class="blog-post__actions-buttons-container">
        <button class="update">Update</button>
        <button class="delete delete-post">Delete</button>
      </div>
    </div>
  </div>`   
);


/**
 * GET THE FORM WITH BLOG VALUES TAKEN FROM BLOG TEXT (TITLE, CONTENT, AUTHOR ID, ETC)
 * @param  {Object} jqueryEvent a jquery event object
 * @return {HTML} the generated form to display for blog update
 */
const getUpdatePostForm = jqueryEvent => {
  let { 
    id, 
    title, 
    author,
    authorId,
    content
  } = getBlogPostTextFields(jqueryEvent, '.post-container');

  return`
    <div class="update-form">
      <div class="update-error error"></div>
      <form action="#/" method="POST" class="blog-update" onsubmit="return false;" id=${id}>
        <input type="hidden" name="author" value="${authorId}">
        <div class="input-wrapper">
          <input class="update-form__author" name="authorEmail" placeholder="Author" value="${author}" readonly>
          <input name="title" placeholder="Title" value="${title}">
        </div>

        <div class="input-wrapper">
          <textarea class="update-form__textarea" name="content" placeholder="Write your post">${content}</textarea>
        </div>     

        <div class="buttons-container">
          <button class="submit-update">Update Post</button>
          <button class="cancel-update" type="button">Cancel</button>
        </div>
      </form>
    </div>`;
};