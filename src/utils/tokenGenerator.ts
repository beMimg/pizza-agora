import jwt from "jsonwebtoken";

interface User {
  _id: object;
  username: string;
}

function tokenGenerator(user: User): string {
  const payload = {
    sub: user._id,
    username: user.username,
  };

  const duration = "1h";

  const accessToken = jwt.sign(payload, process.env.ACCESSTOKEN_KEY, {
    expiresIn: duration,
  });

  return accessToken;
}

export default tokenGenerator;
