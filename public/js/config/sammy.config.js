// sammyApp will be used to create the routes
const sammyApp = (function($) {
  // create sammy app instance
  const app = $.sammy('#main', function() {
    this.use('Template');
    this.use('Session');
  });

  // run the app on '#/'
  $(function() {
    app.run('#/');
  });

  // return the sammy app created above
  // to use on individual routes
  return app;
})(jQuery);

