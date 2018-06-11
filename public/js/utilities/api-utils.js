/**
 * ERROR HANDLER
 * @param  {String or jQuery Object} err passed from the user or from the jQuery error callback
 * @return {undefined} 
 */
const handleApiError = (err, context = false) => {
  let error = typeof err === 'string' 
    ? err
    : `${err.status} ${err.responseJSON.message}`;

  const errorSafeUrl = error.toLowerCase().replace(/ /g, '-' ); // replace empty space for -

  context.redirect(`#/error/${errorSafeUrl}`);  
};


/**
 * AJAX DELETE 
 * @return {undefined}
 */
const deletePost = () => {
  $('body').on('click', '.delete-post', e => {
    if (!confirm('This action cannot be undone. Do you want to proceed?')) {
      return;
    }

    const $postParent = $(e.target).closest('.blog-posts__post');
    const textFields = getBlogTextFields(e);

     // DELETE
    $.ajax({
      url: `${BLOG_ENDPOINT}\/${textFields.id}`,
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
      },
      data: JSON.stringify(textFields), // need to stringify to send as json
      success: () => $postParent.remove(), // remove the blog node
      error: handleApiError
    });
  });
};