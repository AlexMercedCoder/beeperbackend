const {authy} = require("mongorester")

//What our user model looks like
userSchema = {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
  };
   
  schemaConfig = {
    timestamps: true,
  };
   
  options = {
    secret: process.env.SECRET || "Secret",
    tokenConfig: {
      expiresIn: "ih",
    },
  };
   
  const [User, authMiddleware, authRouter, authRester] = authy(
    userSchema,
    schemaConfig,
    options
  );

module.exports = {
    User,
    authMiddleware,
    authRouter,
    authRester
}

