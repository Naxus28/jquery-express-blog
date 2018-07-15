const isAuthenticated = context => {
	return !context.app.session('jwt') 
		? false 
		: jwt_decode(context.app.session('jwt')).exp > moment().unix();
};