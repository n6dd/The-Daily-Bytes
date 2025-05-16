// ==============================
// TODO: Extend Express Request type to include `user` from JWT
// ==============================
declare namespace Express {
  interface Request {
    user?: {
      username: string;
    };
  }
}
// NOTE Required so `req.user` is type-safe in middleware/controllers
