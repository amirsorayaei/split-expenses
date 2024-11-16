import {
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "../../../../../backend/controllers/expenseController";
import { authenticateToken } from "../../../../../backend/middlewares/authMiddleware";

export default async function handler(req, res) {
  const { method } = req;

  await authenticateToken(req, res, async () => {
    if (method === "GET") {
      return getExpenseById(req, res);
    } else if (method === "PATCH") {
      return updateExpense(req, res);
    } else if (method === "DELETE") {
      return deleteExpense(req, res);
    } else {
      res.status(405).json({
        message: "Method Not Allowed",
      });
    }
  });
}
