const z = require("zod");
const userSchema = z.object({
    firstName:z.string(),
    lastName: z.string(),
    username:z.string().email(),
    password:z.string().max(15)
})

const userUpdateSchema = z.object({
    firstName:z.string().max(15).optional(),
    lastName: z.string().max(15).optional(),
    password:z.string().max(15).optional()
})

module.exports = {userSchema,userUpdateSchema};