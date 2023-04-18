import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

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
    if (!user) return res.status(403).json({ error: "Email o password incorrecto." });

    const passwordResponse = await user.comparePassword(password);
    if (!passwordResponse) return res.status(403).json({ success: "Email o password incorrecto." });

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    console.log("🎪 ---> login", user.id, token);
    return res.json({ success: "Bienvenido", token: token, expiracion: expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del server" });
  }
};

export const allUser = (req, res) => {
  res.json({ success: "true" });
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ success: "true", status: "information protected", email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del server" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error, "🌵");

    return res.status(500).json({ error: "error de server" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  console.log("🐙 ---> logout");
  res.json({ ok: true });
};
