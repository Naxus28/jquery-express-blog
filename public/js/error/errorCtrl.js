const errorCtrl = context => {
  // get error from the url slug
  let error = window.location.hash.replace(/(#\/error\/)|(-)/g, ' ');

  context.app.swap('');
  
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-replace
  context
    .render('../../templates/partials/error.template', { error })
    .replace(context.$element());
};