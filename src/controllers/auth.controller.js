import { User } from "../models/User.js";
import { generateToken } from "../utils/tokenManager.js";

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

    //generar jwt
    const { token, expiresIn } = generateToken(user.id);

    //OPc. enviar cookie
    // res.cookie("cookie-Token", token, {
    //   httpOnly: true,
    //   secure: !(process.env.MODO === "developer"),
    // });

    return res.json({ success: "Bienvenido correctamente", token: token, expiracion: expiresIn });
  } catch (error) {}
};
