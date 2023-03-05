const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const jwtAuth = {
  middleware: (req, res, next) => {
    const { token } = req.body;

    console.log(`TOKEN: ${token}`);

    if (!token) return res.json({ message: "NOT AUTHORIZED" });

    try {
      const { data } = jwt.verify(token, secret, { maxAge: "6h" });

      if (data) next();
      else return res.json({ message: "NOT AUTHORIZED" });
    } catch (err) {
      console.error(err);
    }
  },
  sign: ({ _id, email }) =>
    jwt.sign({ data: { _id, email } }, secret, { expiresIn: "6h" })
};

module.exports = jwtAuth;
