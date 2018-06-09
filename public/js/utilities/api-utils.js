/**
 * ERROR HANDLER
 * @param  {String or jQuery Object} err passed from the user or from the jQuery error callback
 * @return {undefined} 
 */
const handleApiError = (err, context) => {
  const error = `${err.status} ${err.statusText}: ${err.responseJSON.message}`;

  context.app.swap('');

  context
    .render('../../templates/error.template', { error })
    .appendTo(context.$element())
    .then(content =>  {
      $('.error').hide();
      $('.error').show()
    });
};