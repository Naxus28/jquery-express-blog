/**
 * AJAX DELETE 
 * @return {undefined}
 */
const deleteBlogListener = context => {
  $('body')
    .off('click', '.delete-post') // prevent jquery from accumulating click events
    .on('click', '.delete-post', e => {

    // if user confirms, delete post
    if (!confirm('This action cannot be undone. Do you want to proceed?')) {
      return;
    } else {
      del();
    }

    // declare delete function with ajax method
    function del() {
      const textFields = getBlogPostTextFields(e);

       // DELETE
      $.ajax({
        url: `${BLOG_ENDPOINT}\/${textFields.id}`,
        method: 'DELETE',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
        },
        data: JSON.stringify(textFields), // need to stringify to send as json
        success: () => context.redirect('/#/'), // remove the blog node
        error: err => handleApiError(err, context)
      });
    }
  });
};