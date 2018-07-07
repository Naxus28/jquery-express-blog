/**
* AJAX POST 
* 'context' is passed from sammy route to which this function is tied
* @return {undefined}
*/
const postBlog = context => {
  let $form = $('.blog-form'),
      $error = $('.post-error'),
      data = $form.serializeObject();
      incompleteFields = fieldsIncomplete(data);

   if (incompleteFields.length) {
    incompleteFields = incompleteFields.length === 1
        ? incompleteFields
        : formatIncompleteFieldsErrorMsg(incompleteFields);

    $error.text('');
    $error.text(`Please enter ${incompleteFields} before submitting the form.`);
    $error.show();

    return;
   }

   // POST
  $.ajax({
    url: BLOG_ENDPOINT,
    method: 'POST',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
    },
    data: JSON.stringify(data), // need to stringify to send as json
    success: post => {
      // format post content
      let content = trimContent(post.content, 350),
          publishDate = formatDateForPost(post.publishDate),
          updatedDate = post.updatedDate && formatDateForPost(post.updatedDate);
      
      let updatedPost = Object.assign({}, post, {publishDate, updatedDate, content})
      
      // interpolate the variables on the template
      // and append to '.blog-posts' in submit-form.template
      // previously loaded into the context 
      context
        .render('../../templates/partials/posts.template', { post: updatedPost })
        .prependTo('.blog-posts');

      $error.hide();
      $form[0].reset();
    },
    error: err => handleApiError(err, context)
  });
};