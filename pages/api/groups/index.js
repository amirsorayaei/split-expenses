import {
  createGroup,
  getAllGroups,
} from "../../../backend/controllers/groupController";
import { authenticateToken } from "../../../backend/middlewares/authMiddleware";

export default async function handler(req, res) {
  const { method } = req;

  await authenticateToken(req, res, async () => {
    if (method === "GET") {
      return getAllGroups(req, res);
    } else if (method === "POST") {
      return createGroup(req, res);
    } else {
      res.status(405).json({
        message: "Method Not Allowed",
      });
    }
  });
}
