// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Method not allowed" });
  }
  const { name, email, phone, password } = req.body;
  const filePath = path.resolve(process.cwd(), "user.json");
  const fileData = fs.readFileSync(filePath);
  const user = JSON.parse(fileData);
  const isExist = user.find((user) => user.email === email);
  if (isExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = {
    id: user.length + 1,
    name: name,
    email: email,
    password: password,
    phone: phone,
  };
  user.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
  return res.status(201).json({ message: "Sukses register", user: newUser });
}
