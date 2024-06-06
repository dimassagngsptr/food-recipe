import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { id, recipe_id, user_id } = req.body;
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method not allowed" });
  }
}
