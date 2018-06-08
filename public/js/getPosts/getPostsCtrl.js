// utilities
const trimContent = (content, maxLen) => {
    return content.length > maxLen ? `${content.substring(0, maxLen)}...` : content;
};
const formatDateForPost = rawDate => moment(rawDate).format('MMMM Do YYYY, h:mm:ss a');

// get method
const getPosts = context => {
  $.ajax({
    url: URL,
    dataType: 'json',
    success: posts => {
      // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
      context.app.swap('');

      // first load the submit-form template
      context.partial('../../templates/submit-form.template');

      // for each post fetched from the api
      $.each(posts, (i, post) => {
        // format post content
        let content = trimContent(post.content, 350),
            publishDate = formatDateForPost(post.publishDate),
            updatedDate = formatDateForPost(post.updatedDate);
        
        let updatedPost = Object.assign({}, post, {publishDate, updatedDate, content})
        
        // interpolate the variables on the template
        // and append to '.blog-posts' in submit-form.template
        // previously loaded into the context 
        context
          .render('../../templates/posts.template', { post: updatedPost })
          .appendTo('.blog-posts');
      });
    },
    // error: handleError
  });
};