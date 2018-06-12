/**
 * GETS POST TEXT FIELDS
 * @param  {jQuery Event Object} e 
 * @return {Object} the text fields
 */
const getBlogPostTextFields = e => {
  let $postParent = $(e.target).closest('.post-container'),
      id = $postParent.attr('id'),
      title = $postParent.find('.blog-post__title').text().trim(),
      author = $postParent.find('.blog-post__author').text().trim(),
      content = $postParent.find('.blog-post__content').text().trim();

  return {
    id,
    title,
    author,
    content
  };
}

/**
 * TRIMS STRING
 * @param  {String} content
 * @param  {Number} maxLen
 * @return {String} the trimmed content
 */
const trimContent = (content, maxLen) => {
  return content.length > maxLen ? `${content.substring(0, maxLen)}...` : content;
};

/**
 * BUILD POST HTML
 * @param  {Array} blogPosts
 * @return {DOM Node(s)}
 */
const buildPostsHTML = post => ( 
  `
    <div class="post-container" id="${post._id}>
      <div class="blog-post__header">
        <h1 class="blog-post__title">${post.title}</h1>
      </div>

      <h3 class="blog-post__author">
        ${post.author}
      </h3>
      <p class="blog-post__content">
        ${post.content}
      </p>
      <div class="blog-post__dates-container">
        <span class="date">Published: ${post.publisheDate}</span>
        <% if (${post.updatedDate}) { %>
          <span class="date">Last update: ${post.updatedDate}</span>
        <% } %>
      </div>
      <div class="blog-post__footer">
        <div class="blog-post__actions-buttons-container">
          <button class="update">Update</button>
          <button class="delete delete-post">Delete</button>
        </div>
      </div>
      <div class="get-blog-error"></div>
    </div>`   
);
