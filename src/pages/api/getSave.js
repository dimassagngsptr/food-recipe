import fs from "fs";
import path from "path";
export default function handler(req, res) {
  const { id, user_id, recipe_id } = req.query;
  console.log(req.query);
  const filePath = path.resolve(process.cwd(), "saves.json");
  const fileData = fs.readFileSync(filePath);
  const saves = JSON.parse(fileData);
  const result = saves.filter(
    (item) =>
      item.recipe_id === recipe_id &&
      item.user_id === user_id &&
      item?.id === id
  );
  if (result == undefined) {
    return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json(result);
}
