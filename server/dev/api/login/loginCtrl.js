import { createJwt } from '../helpers/authHelpers';

export default (req, res) => {
  res.json({ jwt: createJwt(req.user.email) });
};