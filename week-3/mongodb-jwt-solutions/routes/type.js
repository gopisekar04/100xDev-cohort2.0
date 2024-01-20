const {z} = require("zod")

const usernameSchema = z.string();
const passwordSchema = z.string().min(6);

const courseSchema = z.object({
    title: z.string(),
    description: z.string(), 
    price: z.number(),
    imageLink: z.string()
})

module.exports = {
    usernameSchema,
    passwordSchema,
    courseSchema
}