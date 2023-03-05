const { connect, connection } = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/meep";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

(async () => {
  try {
    await connect(URI, options);
  } catch (err) {
    console.error(`Error establishing Mongo connection ::: ${err}`);
  }
})();

module.exports = connection;
