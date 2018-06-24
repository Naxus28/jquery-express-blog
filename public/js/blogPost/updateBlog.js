/**
 * AJAX PUT 
 * @return {undefined}
 */
const updateBlogListener = (context, hiddenPostSelector) => {
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
        // reset the url in case user changes the title (slug is created from the title on the backend) 
        context.app.setLocation(`#/blog/${post.slug}`); 

        $updateForm.remove();
        $form[0].reset();
        $(hiddenPostSelector)
          .html(buildPostsHTML(post))
          .show(); 
      },
      error: err => handleApiError(err, context)
    });
  });
};