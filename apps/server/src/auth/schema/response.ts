import { z } from "zod";

export const LoginResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>;

export const SignUpResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export type SignUpResponseDTO = z.infer<typeof SignUpResponseSchema>;
