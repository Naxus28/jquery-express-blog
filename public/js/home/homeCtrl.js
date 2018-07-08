/**
* AJAX GET 
* @return {undefined}
*/
const getPosts = context => {
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  context.app.swap('');

  // render top bar, header, and footer (prepend header first then topbar--topbar will be on top)
  context.render('../../templates/ui/header.template').prependTo(context.$element());
  context.render('../../templates/ui/top-bar.template').prependTo(context.$element());
  context.render('../../templates/ui/footer.template').appendTo(context.$element());

  // load .the-pit template and append to body
  // then call api with blog post
  context
    .load('../../templates/partials/the-pit.template')
    .then(e => (
      $(e).appendTo(context.$element()),
      blogPostsAjaxCall()
    ));


  const blogPostsAjaxCall = () => {
    $.ajax({
      url: BLOG_ENDPOINT,
      dataType: 'json',
      success: posts => {

        // for each post fetched from the api
        $.each(posts, (i, post) => {
          // format post content
          let content = trimContent(post.content, 350),
              publishDate = formatDateForPost(post.publishDate),
              updatedDate = post.updatedDate && formatDateForPost(post.updatedDate);
          
          let updatedPost = Object.assign({}, post, { publishDate, updatedDate, content })
          
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
};