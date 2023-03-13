const db = require("../config/db");

db.once("open", async () => {
  await db.dropDatabase();
  process.exit(0);
});
