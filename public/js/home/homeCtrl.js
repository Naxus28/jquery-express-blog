/**
* AJAX GET 
* @return {undefined}
*/
const getPosts = context => {
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  context.app.swap('');

  $.ajax({
    url: BLOG_ENDPOINT,
    dataType: 'json',
    success: posts => {

       // load the-pit template
      context.partial('../../templates/partials/the-pit.template');

      // render the footer and header
      context.render('../../templates/ui/header.template').prependTo('#main');
     

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

      // render the footer
      context.render('../../templates/ui/footer.template').appendTo('#main');
      
    },
    error: err => handleApiError(err, context)
  });
};