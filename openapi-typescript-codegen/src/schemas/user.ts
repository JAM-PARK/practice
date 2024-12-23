// src/schemas/user.ts
import { z } from 'zod'

const UserSchema = z.object({
  id: z.number(),
  name: z.string()
})

const UserListSchema = z.array(UserSchema)

export const UserCreateSchema = z.object({
  name: z.string()
})

export type UserList = z.infer<typeof UserListSchema>
