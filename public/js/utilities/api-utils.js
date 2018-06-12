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
const updateBlogPost = () => {
  $('body').on('click', '.update', e => {
    let $postParent = $(e.target).closest('.blog-post__post');

    // get values from fields
    let { 
      id, 
      author,
      title, 
      content
    } = getBlogTextFields(e);

    // create form
    let inlineForm =  
    `<div class="update-form">
      <div class="update-error error"></div>
      <form action="#" class="blog-update"  onsubmit="return false;" id=${id}>
        <div class="input-wrapper">
          <input name="author" placeholder="Author" value="${author}">
          <input name="title" placeholder="Title" value="${title}">
        </div>

        <div class="input-wrapper">
          <textarea name="content" placeholder="Write your post">${content}</textarea>
        </div>     

        <div class="buttons-container">
          <button class="submit-update">Update Post</button>
          <button class="cancel-update" type="button">Cancel</button>
        </div>
      </form>
    </div>`;

    $postParent.after(inlineForm);
    $postParent.hide();
  });
};

/**
 * HANDLES CLICKS ON 'CANCEL' THAT CANCEL OUT OF THE UPDATE OPTION
 * @return {undefined}
 */
const cancelUpdateSubmission = () => {
  $('body').on('click', '.cancel-update', e => {
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
const submitUpdate = () => {
  $('body').on('submit', '.blog-update', e => {
    event.preventDefault();

      let $form = $(e.target),
          id = $form.attr('id'),
          $error = $(e.target).closest('.update-form').find('.update-error'),
          $updateForm = $('.blog-update'),
          data = $form.serializeObject();
          incompleteFields = fieldsIncomplete(data);

       if (incompleteFields.length) {
        let formattedFields = incompleteFields.length === 1
            ? incompleteFields
            : formatIncompleteFieldsErrorMsg(incompleteFields);

        handleError(`Please enter ${formattedFields} before submitting the form.`, $error);
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
        success: posts => {
          $('.blog-posts').prepend(buildPostsHTML([posts])); // pass the single post as an array so we can map over it on 'buildPostsHTML'
          $error.hide();
          $updateForm.remove();
          $form[0].reset();
        },
        error: err => handleError(err)
      });
    });
};