const renderDash = context => {
	// http://sammyjs.org/docs/api/0.7.4/all#Sammy.Application-swap
  context.app.swap('');

  // 'partial' takes the whole content of context.$element() (like jquery's html)
  // need to insert it first then append the other elements
  context.partial('../../templates/partials/the-pit.template');

  // render top bar, header, and footer (prepend header first then topbar--topbar will be on top)
  // context.render('../../templates/ui/header.template').prependTo(context.$element());
  context.render('../../templates/ui/top-bar.template').prependTo(context.$element());
  context.render('../../templates/ui/footer.template').appendTo(context.$element());

	context.render('../../templates/partials/dashboard.template')
  	.appendTo('.the-pit');
};