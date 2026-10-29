import { randomBytes, scryptSync } from "node:crypto";

if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== "function") {
  console.error("Run this script in an interactive terminal.");
  process.exit(1);
}

const password = await new Promise((resolve, reject) => {
  let value = "";
  process.stdout.write("Admin password (input is hidden): ");
  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.resume();

  const finish = () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdout.write("\n");
    resolve(value);
  };

  process.stdin.on("data", (chunk) => {
    for (const character of chunk) {
      if (character === "\u0003") {
        process.stdout.write("\n");
        reject(new Error("Password hashing cancelled."));
        process.exit(130);
      }

      if (character === "\r" || character === "\n") {
        finish();
        return;
      }

      if (character === "\u007f" || character === "\b") {
        value = Array.from(value).slice(0, -1).join("");
        continue;
      }

      value += character;
    }
  });
});

if (typeof password !== "string" || password.length < 14) {
  console.error("Use a password with at least 14 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const derivedKey = scryptSync(password, salt, 64).toString("hex");
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt}$${derivedKey}`);
