/**
* AJAX POST 
* 'context' is passed from sammy route to which this function is tied
* @return {undefined}
*/
const doSignup = context => {
  let $form = $('.signup__form'),
      $error = $('.signup__error'),
      data = $form.serializeObject();
      incompleteFields = fieldsIncomplete(data, 'signup');

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
    url: SIGNUP_ENDPOINT,
    method: 'POST',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
    },
    data: JSON.stringify(data), // need to stringify to send as json
    success: res => {

    	console.log('res: ', res);

    	context.redirect('#/dashboard');
			      
      // interpolate the variables on the template
      // and append to '.blog-posts' in submit-form.template
      // previously loaded into the context 
      // context
      //   .render('../../templates/partials/posts.template', { post: updatedPost })
      //   .prependTo('.blog-posts');

    },
    error: err => handleApiError(err, context)
  });
};