import z from "zod"

export const signupSchema = z.object({
    username : z.string().min(2, "Username Should be More than 2 characters"),
    email : z.string().email(),
    password : z.string().min(6, "Password Should be minimum of 6 charaters")
})

export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string()
})