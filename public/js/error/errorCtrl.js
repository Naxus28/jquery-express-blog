const errorCtrl = context => {
  let error = window.location.hash.replace(/(#\/error\/)|(-)/g, ' ');

  context.swap('');
  
  context
    .render('../../templates/error.template', { error })
    .appendTo(context.$element());
};