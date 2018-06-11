/**
 * GETS POST TEXT FIELDS
 * @param  {jQuery Event Object} e 
 * @return {Object} the text fields
 */
const getBlogTextFields = e => {
  let $postParent = $(e.target).closest('.blog-post'),
      id = $postParent.attr('id'),
      title = $postParent.find('.blog-post__title').text(),
      author = $postParent.find('.blog-post__footer .author').text(),
      content = $postParent.find('.blog-post__content').text();

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
