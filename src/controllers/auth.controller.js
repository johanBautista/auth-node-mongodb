export const allUser = (req, res) => {
  res.json({ success: "true" });
};

export const register = (req, res) => {
  res.json({ success: "true register" });
  console.log("----> Rq 🚒", req.body);
};

export const login = (req, res) => {
  res.json({ success: "true login" });
};
