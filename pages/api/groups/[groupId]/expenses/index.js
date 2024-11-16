import {
  createExpense,
  getAllExpenses,
} from "../../../../../backend/controllers/expenseController";
import { authenticateToken } from "../../../../../backend/middlewares/authMiddleware";

export default async function handler(req, res) {
  const { method } = req;

  await authenticateToken(req, res, async () => {
    if (method === "GET") {
      return getAllExpenses(req, res);
    } else if (method === "POST") {
      return createExpense(req, res);
    } else {
      res.status(405).json({
        message: "Method Not Allowed",
      });
    }
  });
}
