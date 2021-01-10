userSchema = {
    username: String,
    password: String,
    email: String,
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