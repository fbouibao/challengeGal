const bcrypt = require("bcryptjs");
const { Level } = require("level");

const db = new Level("./my-database", { valueEncoding: "json" });

async function populateDB() {
  try {
    const users = [
      { username: "muser1", password: "mpassword1" },
      { username: "muser2", password: "mpassword2" },
      { username: "muser3", password: "mpassword3", blocked: true }, // Blocked user
    ];

    const saltRounds = 10;
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      await db.put(user.username, hashedPassword);
      if (user.blocked) {
        await db.put(user.username + "_blocked", "true");
      }
    }

    console.log("Database populated successfully.");
  } catch (error) {
    console.error("Error populating the database:", error);
  }
}

populateDB();
