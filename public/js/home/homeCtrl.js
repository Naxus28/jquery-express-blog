/**
* AJAX GET 
* @return {undefined}
*/
const getPosts = context => {
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  context.app.swap('');


  // 'partial' takes the whole content of context.$element() (like jquery's html)
  // need to insert it first then append the other elements
  context.partial('../../templates/partials/the-pit.template')

  // render top bar, header, and footer (prepend header first then topbar--topbar will be on top)
  // context.render('../../templates/ui/header.template').prependTo(context.$element());
  context.render('../../templates/ui/top-bar.template').prependTo(context.$element());
  context.render('../../templates/ui/footer.template').appendTo(context.$element());

  // get blog posts from api
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