import { Level } from "level";
const bcrypt = require("bcryptjs");

export const db = { db: new Level("./my-database", { valueEncoding: "json" }) };

export async function getUserByUsername(username: string) {
  try {
    const user = await db.db.get(username);
    console.log(`user: ${user}`);

    return user;
  } catch (error: any) {
    return null;
  }
}

export async function checkExistUser(username: string, password: string) {
  try {
    const hashedPasswordFromDB = await db.db.get(username);
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);
    return passwordMatch;
  } catch (error: any) {
    return false;
  }
}

export async function checkBlockedUser(username: string) {
  try {
    const blocked = await db.db.get((username + "_blocked") as string);
    console.log("blocked", blocked);
    if (blocked == "true") return true;
    return false;
  } catch (error: any) {
    return false;
  }
}

export async function showDBContent() {
  try {
    const keys: any[] = [];
    const iterator = db.db.iterator();
    for await (const [key, value] of iterator) {
      keys.push({key, value});
    }
    iterator.close();
    return keys;
  } catch (error) {
    console.error("Error showing database contents:", error);
  }
}

export async function likeImage(username: string, imageId: string) {
  try {
    await db.db.put((username + "_" + imageId) as string, "true");
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function dislikeImage(username: string, imageId: string) {
  try {
    const getKey = await db.db.del((username + "_" + imageId) as string);
    return true;
  } catch (error: any) {
    return false;
  }
}
