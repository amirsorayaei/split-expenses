import {
  deleteGroup,
  getGroupById,
  updateGroup,
} from "../../../../backend/controllers/groupController";
import { authenticateToken } from "../../../../backend/middlewares/authMiddleware";

export default async function handler(req, res) {
  const { method } = req;

  await authenticateToken(req, res, async () => {
    if (method === "GET") {
      return getGroupById(req, res);
    } else if (method === "PATCH") {
      return updateGroup(req, res);
    } else if (method === "DELETE") {
      return deleteGroup(req, res);
    } else {
      res.status(405).json({
        message: "Method Not Allowed",
      });
    }
  });
}
