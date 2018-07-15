/**
* AJAX POST 
* 'context' is passed from sammy route to which this function is tied
* @return {undefined}
*/
const doLogin = context => {
  let $form = $('.login__form'),
      $error = $('.login__error'),
      data = $form.serializeObject();
      incompleteFields = fieldsIncomplete(data, 'login');

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
    url: LOGIN_ENDPOINT,
    method: 'POST',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json' // browsers default Content-Type to application/x-www-form-urlencoded
    },
    data: JSON.stringify(data), // need to stringify to send as json
    success: res => {
      // set jwt and authenticated session values
      // sammy will attempt to store data in this order:
      // 1. localStorage, 2. cookies, 3. memory (data is lost on page refresh)
      // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Session
      
      //TODO: encrypt jwt: var encriptedJwt = CryptoJS.AES.encrypt(res.jwt, res.clientSecret);
      context.app.session('jwt', res.jwt);
      context.app.session('user', res.user);
    	context.redirect('#/dashboard');
    },
    error: err => handleApiError(err, context)
  });
};