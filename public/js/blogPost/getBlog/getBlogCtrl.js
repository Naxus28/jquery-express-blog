/**
* AJAX GET:slug
* @return {undefined}
*/
const getPost = context => {
  const slug = window.location.hash.replace('#/blog', '');

  // starts listeners for update and delete 
  // on this blog post
  updateBlogListener(context, '.blog-post');
  deleteBlogListener(context);

  initUpdateBlogListeners('.blog-post');

  $.ajax({
    url: `${BLOG_ENDPOINT}${slug}`,
    dataType: 'json',
    success: post => {
      let publishDate = formatDateForPost(post.publishDate),
          updatedDate = post.updatedDate && formatDateForPost(post.updatedDate);

      // mutate post with formatted data
      Object.assign(post, { publishDate, updatedDate })

      // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
      context.app.swap('');

      // interpolate the object and template
      // and append to #main
      context
        .render('../../templates/post.template', { post })
        .appendTo(context.$element());
    },
    error: err => handleApiError(err, context)
  });
};