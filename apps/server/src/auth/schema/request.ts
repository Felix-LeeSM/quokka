import { z } from "zod";

export const LogInRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LogInRequestDTO = z.infer<typeof LogInRequestSchema>;

export const SignUpRequestSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password does not match confirmPassword",
    path: ["confirmPassword"],
  });

export type SignUpRequestDTO = z.infer<typeof SignUpRequestSchema>;
