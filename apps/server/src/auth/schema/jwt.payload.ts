import { z } from "zod";

// {
//   "iss": "issuer",         // 토큰 발급자
//   "sub": "subject",        // 토큰 제목 (주로 사용자 ID)
//   "aud": "audience",       // 토큰 대상자
//   "exp": 1735689600,       // 만료 시간 (Unix timestamp)
//   "nbf": 1735686000,       // 활성화 시간 (이전에는 사용 불가)
//   "iat": 1735686000,       // 발급 시간 (Issued At)
//   "jti": "unique_id"       // 토큰 고유 식별자
// }

export const JwtPayloadSchema = z.object({
  iss: z.string().optional(),
  sub: z.number(),
  username: z.string(),
  nbf: z.number().optional(),
  iat: z.number().optional(),
  exp: z.number().optional(),
  jti: z.string().optional(),
});

export type JwtPaylad = z.infer<typeof JwtPayloadSchema>;
