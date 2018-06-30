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

      // render the footer and header
      context.render('../../templates/ui/header.template').prependTo('body');
      context.render('../../templates/ui/footer.template').appendTo('body');

      // load the-pit template
      context.partial('../../templates/partials/the-pit.template');

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
          .appendTo('.the-pit');
      });
      
    },
    error: err => handleApiError(err, context)
  });
};