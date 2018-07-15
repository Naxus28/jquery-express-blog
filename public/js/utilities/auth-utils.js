const isAuthenticated = context => {
	const storedJwt  = context.app.session('jwt');
	if (!storedJwt) return false;

	const jwt = storedJwt && jwt_decode(context.app.session('jwt'));
	return jwt.exp > moment().unix();
};