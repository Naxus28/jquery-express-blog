const getPost = context => {
  const urlPath = window.location.hash.replace('#/blog', '');

  $.ajax({
    url: `${BLOG_ENDPOINT}${urlPath}`,
    dataType: 'json',
    success: post => {
      post = post[0];

      // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
      context.app.swap('');

      // interpolate the object and template
      // and append to #main
      context
        .render('../../templates/post-detail.template', { post })
        .appendTo(context.$element());
    },
    error: err => handleApiError(err, context)
  });
};