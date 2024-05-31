import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);

const serviceAccount = JSON.parse(
  await readFile(new URL("serviceAccount.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();

    const users = await Promise.all(
      listUsersResult.users.map(async (user) => {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isVerified: user.emailVerified,
        };
        return userData;
      })
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


app.listen(3001, () => console.log("Server started on port 3001"));