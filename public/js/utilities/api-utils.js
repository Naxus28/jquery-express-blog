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
const deletePost = context => {
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
        error: handleApiError
      });
    }
  });
};



/**
 * AJAX PUT 
 * @return {undefined}
 */
const submitUpdate = (context, hiddenPostSelector) => {
  $('body').on('submit', '.blog-update', e => {
    event.preventDefault();
    
    let $form = $(e.target),
        id = $form.attr('id'),
        $updateForm = $('.update-form'),
        data = $form.serializeObject();
        incompleteFields = fieldsIncomplete(data);


     if (incompleteFields.length) {
      let formattedFields = incompleteFields.length === 1
          ? incompleteFields
          : formatIncompleteFieldsErrorMsg(incompleteFields);

      displayFormError(`Please enter ${formattedFields} before submitting the form.`, context, '.update-error');
      return;
     }

     // PUT
    $.ajax({
      url: `${BLOG_ENDPOINT}\/${id}`,
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
      },
      data: JSON.stringify(Object.assign(data, { id: id })), // need to stringify to send as json
      success: post => {
        $updateForm.remove();
        $form[0].reset();
        $(hiddenPostSelector)
          .html(buildPostsHTML(post))
          .show(); 
      },
      error: err => handleApiError(err)
    });
  });
};

const initApiListeners = (context, hiddenPostSelector) => {
  deletePost(context);
  submitUpdate(context, hiddenPostSelector);
};