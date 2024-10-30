import { z } from "zod";

const minimo8 = "Minimo de 8 caracteres";
const informeNome = "Informe seu nome";
const informeSenha = "Informe sua senha";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, informeSenha),
});

export const registerSchema = z.object({
  name: z.string().trim().min(5, informeNome),
  email: z.string().email(),
  password: z.string().min(8, minimo8),
});
