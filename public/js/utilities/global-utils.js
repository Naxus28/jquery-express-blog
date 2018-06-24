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
      authorId = $postParent.find('.blog-post__author-id').val().trim(),
      content = $postParent.find('.blog-post__content').text().trim();

  return {
    id,
    title,
    author,
    authorId,
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




