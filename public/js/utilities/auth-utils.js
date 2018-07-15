const isAuthenticated = context => {
	if (!context.app.session('jwt')) return false;

	const jwt = storedJwt && jwt_decode(context.app.session('jwt'));
	return jwt.exp > moment().unix();
};