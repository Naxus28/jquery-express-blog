import { createJwt } from '../helpers/helpers';

export default (req, res) => {
  const jwt = createJwt(req.user.email);
  res.json({ jwt });
};