(function($) {

  var app = $.sammy('#main', function() {
    this.use('Template');

    this.get('#/', function(context) {
      $.ajax({
        url: URL,
        dataType: 'json',
        success: posts => {
          // http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
          context.app.swap('');

          // first load the submit-form template
          this.partial('../templates/submit-form.template');

          // for each post fetched from the api
          $.each(posts, (i, post) => {
            // format dates
            let { publishDate, updatedDate } = post;
            publishDate = moment(publishDate).format('MMMM Do YYYY, h:mm:ss a');
            updatedDate = updatedDate && moment(updatedDate).format('MMMM Do YYYY, h:mm:ss a');

            // interpolate the variables on the template
            // and append to '.blog-posts' in submit-form.template
            // previously loaded into the context 
            context.render('../templates/posts.template', { 
              post,
              publishDate,
              updatedDate
            })
            .appendTo('.blog-posts');
          });
        },
        // error: handleError
      });
    });

    // this.get('#/item/:id', function(context) {
    //   this.item = this.items[this.params['id']];
    //   if (!this.item) { return this.notFound(); }
    //   this.partial('templates/item_detail.template');
    // });

    // this.post('#/cart', function(context) {
    //   var item_id = this.params['item_id'];
    //   // fetch the current cart
    //   var cart  = this.session('cart', function() {
    //     return {};
    //   });
    //   if (!cart[item_id]) {
    //     // this item is not yet in our cart
    //     // initialize its quantity with 0
    //     cart[item_id] = 0;
    //   }
    //   cart[item_id] += parseInt(this.params['quantity'], 10);
    //   // store the cart
    //   this.session('cart', cart);
    //   this.trigger('update-cart');
    // });

    // this.bind('update-cart', function() {
    //   var sum = 0;
    //   $.each(this.session('cart') || {}, function(id, quantity) {
    //     sum += quantity;
    //   });
    //   $('.cart-info')
    //       .find('.cart-items').text(sum).end()
    //       .animate({paddingTop: '30px'})
    //       .animate({paddingTop: '10px'});
    // });

    // this.bind('run', function() {
    //   // initialize the cart display
    //   this.trigger('update-cart');
    // });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
