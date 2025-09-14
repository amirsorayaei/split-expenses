const API_URL = "https://split-expenses.amirsorayaei.com/";
const LOCAL_API_URL = "http://localhost:3000";

export const BASE_API_URL =
  process.env.NODE_ENV === "development" ? LOCAL_API_URL : API_URL;
