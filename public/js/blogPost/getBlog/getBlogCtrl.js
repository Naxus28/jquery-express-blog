/**
* AJAX GET:slug
* 'context' is passed from sammy route to which this function is tied
* @return {undefined}
*/
const getPost = context => {
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  context.app.swap('');
  
  const slug = window.location.hash.replace('#/blog', '');

  // starts listeners for update and delete 
  // on this blog post
  updateBlogListener(context, '.blog-post');
  deleteBlogListener(context);

  initUpdateBlogUIListeners('.blog-post');


  // load .the-pit template and append to body
  // then call api with blog post
  context
    .load('../../templates/partials/the-pit.template')
    .then(e => {
      $(e).appendTo(context.$element());
      blogAjaxCall();
    });

  
  const blogAjaxCall = () => {
    $.ajax({
      url: `${BLOG_ENDPOINT}${slug}`,
      dataType: 'json',
      success: post => {
        let publishDate = formatDateForPost(post.publishDate),
            updatedDate = post.updatedDate && formatDateForPost(post.updatedDate);

        // mutate post with formatted data
        Object.assign(post, { publishDate, updatedDate })
        
        // render the header
        context.render('../../templates/ui/header.template').prependTo('.the-pit');
        
        // interpolate the object and template and append to #main
        context
          .render('../../templates/partials/post.template', { post })
          .appendTo('.the-pit');

        // render the footer
        context.render('../../templates/ui/footer.template').appendTo('.the-pit');
      },
      error: err => handleApiError(err, context)
    });
  }
  
};