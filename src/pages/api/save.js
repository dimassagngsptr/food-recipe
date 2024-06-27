import fs from "fs";
import path from "path";
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Method not allowed" });
  }
  const { recipe_id, user_id, id } = req.body;
  const filePath = path.resolve(process.cwd(), "saves.json");
  const fileData = fs.readFileSync(filePath);
  const saves = JSON.parse(fileData);
  const newSave = { id: id, recipe_id: recipe_id, user_id: user_id };
  saves.push(newSave);
  fs.writeFileSync(filePath, JSON.stringify(saves, null, 2));
  res.status(201).json({ message: "Sukses mengelike", save: newSave });
}
