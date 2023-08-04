import { getUserByUsername } from "./db";

// Function to handle user authentication
export async function authenticate(username: string, password: string) {
  const user = await getUserByUsername(username);
  console.log(user);
  return null;
}

// authenticate of all users
authenticate("muser1", "mpassword1");
authenticate("muser2", "mpassword2");
authenticate("muser3", "mpassword3");
console.log(`after authenticate ${process.env.PATH}`);

export const random = {
  value: "random",
};
