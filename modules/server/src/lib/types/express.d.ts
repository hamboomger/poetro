declare namespace Express {
  // This interface is used only once in order to get the id from the passport.js-serialized
  // user, create JWT token and then send it back to the user
  interface User {
    id: string,
    email: string,
    name: string,
    googleId?: string
  }

  interface Request {
    appUser?: User
  }
}
