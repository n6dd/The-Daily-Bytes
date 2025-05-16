import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ==============================
// TODO: Define interface for decoded JWT payload
// ==============================
interface JwtPayload {
  username: string;
}

// ==============================
// TODO: Middleware to verify JWT and attach decoded user to request
// ==============================
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // NOTE Expect Authorization header in format: Bearer <token>
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log("Token: ", token); // NOTE: Optional — remove or mask in production

    const secretKey = process.env.JWT_SECRET_KEY || '';
    console.log("Secret Key: ", secretKey); // NOTE: Optional — remove in production

    // TODO: Validate token using secret
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log("Auth Error: ", err);
        return res.sendStatus(403); // NOTE Token invalid → Forbidden
      }

      // NOTE Attach user info from token to req.user
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    // NOTE No token provided → Unauthorized
    res.sendStatus(401);
  }
};
