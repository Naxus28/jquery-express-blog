/**
* AJAX GET:slug
* 'context' is passed from sammy route to which this function is tied
* @return {undefined}
*/
const getPost = context => {
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  context.app.swap('');

  // 'partial' takes the whole content of context.$element() (like jquery's html)
  // need to insert it first then append the other elements
  context.partial('../../templates/partials/the-pit.template')

  // render the header and footer -- append to 'context.$element()' (#main)
  // context.render('../../templates/ui/header.template').prependTo(context.$element());
  context.render('../../templates/ui/top-bar.template').prependTo(context.$element());
  context.render('../../templates/ui/footer.template').appendTo(context.$element());

  const slug = window.location.hash.replace('#/blog', '');

  // starts listeners for update and delete 
  // on this blog post
  updateBlogListener(context, '.blog-post');
  deleteBlogListener(context);

  // listens for clicks on 'update' and 'cancel' buttons
  initUpdateBlogUIListeners('.blog-post');

  // get blog post from api
  $.ajax({
    url: `${BLOG_ENDPOINT}${slug}`,
    dataType: 'json',
    success: post => {
      let publishDate = formatDateForPost(post.publishDate),
          updatedDate = post.updatedDate && formatDateForPost(post.updatedDate);

      // mutate post with formatted data
      Object.assign(post, { publishDate, updatedDate })
      
      
      // interpolate the object and template and append to .the-pit
      context
        .render('../../templates/partials/post.template', { post })
        .appendTo('.the-pit');
    },
    error: err => handleApiError(err, context)
  });
};