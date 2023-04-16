import { User } from "../models/User.js";

export const allUser = (req, res) => {
  res.json({ success: "true" });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw new Error(`El ${user.email} ya existe`);

    user = new User({ email, password });
    await user.save();

    return res.json({ success: "ok register" });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    // No existe usuario
    if (!user) return res.status(403).json({ error: "Email o password incorrecto." });

    const passwordResponse = await user.comparePassword(password);
    // Password incorrecto
    if (!passwordResponse) return res.status(403).json({ success: "Email o password incorrecto." });

    return res.json({ success: "Bienvenido correctamente" });
  } catch (error) {}
};
