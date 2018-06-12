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
 * HANDLES CLICKS ON 'UPDATE' BUTTON (NOT SUBMISSION) 
 * @return {undefined}
 */
const updateBlogPost = hiddenPostSelector => {
  $('body')
    .off('click', '.update')
    .on('click', '.update', e => {
      let $postParent = $(e.target).closest(hiddenPostSelector);

      $postParent.after(getUpdatePostForm(e));
      $postParent.hide();
  });
};

/**
 * HANDLES CLICKS ON 'CANCEL' THAT CANCEL OUT OF THE UPDATE OPTION
 * @return {undefined}
 */
const cancelUpdateSubmission = () => {
  $('body')
  .off('click', '.cancel-update')
  .on('click', '.cancel-update', e => {
    let $target = $(e.target),
        $form = $target.closest('.blog-update'),
        $postParent = $target.closest('.update-form').prev(),
        $error = $target.closest('.update-form').find('.update-error');

    $postParent.show();
    $form.hide();
    $error.hide();
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

const initApiListeners = context => {
  deletePost(context);
  updateBlogPost('.blog-post');
  cancelUpdateSubmission();
  submitUpdate(context, '.blog-post');
};