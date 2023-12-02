import {z} from 'zod'

// registrar admin
const registerOwnerSchema = z.object({
    body: z.object({
        name: z.string().trim().nonempty(),
        email: z.string().trim().email({message: "Email es inválido"}).nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        confirmPass: z.string().nonempty().min(6)
    }).transform((val, ctx) => {
        if(val.password !== val.confirmPass) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "contraseñas no son iguales"
            })
            return z.NEVER;
        }
        return val;
    })
});


// cambiar contraseña
const changeUserPasswordSchema = z.object({
    body: z.object({
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        newPassword: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
    })
});

const registerDriveSchema = z.object({
    body: z.object({
        name: z.string().trim().nonempty(),
        email: z.string().trim().email({message: "Email es inválido"}).nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        dni: z.string().min(7, {message: 'Mínimo 7 dígitos'}).trim().nonempty(),
        phone: z.string().trim().optional(),
        device: z.string().trim().optional(),
        address: z.string().trim().optional(),
        confirmPass: z.string().nonempty().min(6)
    }).transform((val, ctx) => {
        if(val.password !== val.confirmPass) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "contraseñas no son iguales"
            })
            return z.NEVER;
        }
        return val;
    })
});

const registerCustomerSchema = z.object({
    body: z.object({
        name: z.string().trim().nonempty(),
        lastName: z.string().trim().optional(),
        email: z.string().trim().email({message: "Email es inválido"}).nonempty(),
        // password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
        dni: z.string().min(7, {message: 'Mínimo 7 dígitos'}).trim().nonempty(),
        phone: z.string().trim().optional(),
        address: z.string().trim().optional(),
    //     confirmPass: z.string().nonempty().min(6)
    // }).transform((val, ctx) => {
    //     if(val.password !== val.confirmPass) {
    //         ctx.addIssue({
    //             code: z.ZodIssueCode.custom,
    //             message: "contraseñas no son iguales"
    //         })
    //         return z.NEVER;
    //     }
    //     return val;
    })
});

const loginSchema = z.object({
    body: z.object({
        user: z.string().min(8).trim().nonempty(),
        password: z.string().trim().min(6, {message: "Contraseña es muy corta"}),
    })
});

const recoverPasswordSchema = z.object({
    body: z.object({
        email: z.string().email().min(8).trim().nonempty(),
    })
});

export {
    registerOwnerSchema,
    registerDriveSchema,
    loginSchema,
    registerCustomerSchema,
    changeUserPasswordSchema,
    recoverPasswordSchema
}