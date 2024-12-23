// src/schemas/user.ts
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const UserListSchema = z.array(UserSchema)

export const UserCreateSchema = z.object({
  name: z.string()
})

export type User = z.infer<typeof UserSchema>
