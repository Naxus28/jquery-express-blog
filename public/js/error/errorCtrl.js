const errorCtrl = context => {
  // get error from the url slug
  let error = window.location.hash.replace(/(#\/error\/)|(-)/g, ' ');

  context.app.swap('');

  // 'partial' takes the whole content of context.$element() (like jquery's html)
  // need to insert it first then append the other elements
  context.partial('../../templates/partials/the-pit.template')

  // render top bar, header, and footer (prepend header first then topbar--topbar will be on top)
  // context.render('../../templates/ui/header.template').prependTo(context.$element());
  context.render('../../templates/ui/top-bar.template').prependTo(context.$element());
  context.render('../../templates/ui/footer.template').appendTo(context.$element());
  
  // http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-replace
  context
    .render('../../templates/partials/error.template', { error })
    .replace('.the-pit');
};