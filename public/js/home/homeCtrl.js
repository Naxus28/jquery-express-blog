/**
* AJAX GET 
* @return {undefined}
*/
const getPosts = context => {
  $.ajax({
    url: BLOG_ENDPOINT,
    dataType: 'json',
    success: posts => {
      // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
      context.app.swap('');

      // first load the submit-form template
      context.partial('../../templates/partials/submit-form.template');

      // for each post fetched from the api
      $.each(posts, (i, post) => {
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
          .appendTo('.blog-posts');
      });
    },
    error: err => handleApiError(err, context)
  });
};