import { z } from 'zod'

const UserSchema = z.object({
    username : z.string()
})

type User = z.infer<typeof UserSchema>

const user = { username:'Zod'}

console.log(UserSchema.parse(user))