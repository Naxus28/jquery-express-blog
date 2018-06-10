/**
 * ERROR HANDLER
 * @param  {String or jQuery Object} err passed from the user or from the jQuery error callback
 * @return {undefined} 
 */
const handleApiError = (err, context = false) => {
  let error = typeof err === 'string' 
    ? err
    : `${err.status} ${err.responseJSON.message}`;

  context.app.swap('');

  context
    .render('../../templates/error.template', { error })
    .appendTo(context.$element())
    .then(content =>  {
      $('.error').hide();
      $('.error').show()
    });
};