import { createJwt } from '../auth/helpers/helpers';

export default (req, res) => {
  res.json({ jwt: createJwt(req.user.email) });
};