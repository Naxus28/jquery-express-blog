const getPost = context => {
  context.partial('../../templates/post-detail.template');
  // $.ajax({
  //   url: URL,
  //   dataType: 'json',
  //   success: posts => {
  //     // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  //     context.app.swap('');

  //     // first load the submit-form template
  //     context.partial('../templates/submit-form.template');

  //     // for each post fetched from the api
  //     $.each(posts, (i, post) => {
  //       // format dates
  //       let { publishDate, updatedDate } = post;
  //       publishDate = moment(publishDate).format('MMMM Do YYYY, h:mm:ss a');
  //       updatedDate = updatedDate && moment(updatedDate).format('MMMM Do YYYY, h:mm:ss a');

  //       // interpolate the variables on the template
  //       // and append to '.blog-posts' in submit-form.template
  //       // previously loaded into the context 
  //       context.render('../templates/posts.template', { 
  //         post,
  //         publishDate,
  //         updatedDate
  //       })
  //       .appendTo('.blog-posts');
  //     });
    // },
    // error: handleError
  // });
};