const isAuthenticated = context => {
	const jwt = jwt_decode(context.app.session('jwt'));
	return jwt.exp > moment().unix();
};