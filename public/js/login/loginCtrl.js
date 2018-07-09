const login = context => {
  context.app.swap('');

  // render the footer and header
  context.render('../../templates/ui/header.template').prependTo('body');
  context.render('../../templates/ui/footer.template').appendTo('body');
  context.partial('../../templates/partials/the-pit.template');
  context.render('../../templates/pages/login.template').appendTo('.the-pit');;
};