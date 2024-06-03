import fs from "fs";
import path from "path";
export default function handler(req, res) {
  const { id, user_id } = req.body;
  const filePath = path.resolve(process.cwd(), "like.json");
  const fileData = fs.readFileSync(filePath);
  const likes = JSON.parse(fileData);
  const newLike = { recipe_id: id, user_id: user_id };
  likes.push(newLike);
  fs.writeFileSync(filePath, JSON.stringify(likes, null, 2));
  res.status(201).json({ message: "Sukses mengelike", like: newLike });
}
