import { z } from "zod";

const createDaySchema = z.object({
    body: z.object({
        iddrive: z.number().min(1),
        idtruck: z.number().min(1),
        idpath: z.number().min(1),
        iduser: z.number().min(1),
        lts: z.number().min(1),
        dateStart: z.string(),
        dateEnd: z.string().optional(),
        createdAt: z.string().optional(),
    })
});

const updateFinallyDaySchema = z.object({
    body: z.object({
        dateEnd: z.string().nonempty(),
    }),
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});

const updateDayStatuschema = z.object({
    body: z.object({
        status: z.enum(['wait', 'charging', 'dispatching', 'end', 'null']),
    }),
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});

const updateDaySchema = z.object({
    body: z.object({
        iddrive: z.number().optional(),
        idtruck: z.number().optional(),
        idpath: z.number().optional(),
        iduser: z.number().optional(),
        lts: z.number().optional(),
        dateStart: z.string().optional(),
        dateEnd: z.string().optional(),
        status: z.enum(['wait', 'charging', 'dispatching', 'end', 'null']).optional(),
    }),
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});

const updateDayRouteschema = z.object({
    body: z.object({
        id: z.number().min(1),
        status: z.boolean()
    }),
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});

/** obtener paths */
const getDaysSchema = z.object({
    query: z.object({
        limit: z.string().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('2'),
        page: z.string().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }).default('1'),
        drive: z.string().optional(),
        customer: z.string().optional(),
        status: z.enum(['wait', 'charging', 'dispatching', 'end', 'null']).optional(),
        sale: z.enum(['day', 'month']).optional(),
        path: z.string().optional(),
        trucks: z.string().refine((data) => {
            return data === 'true' || data === 'false';
          },
          {
            message: 'El valor debe ser "true" o "false"',
          }).transform(data => data === 'true').default('false')
        // path: z.string().optional().transform((val) => {
        //     return (val === 'true')
        // })
    }),
});

const getDaySchema = z.object({
    params: z.object({
        id: z.string().nonempty().transform((val, ctx) => {
            const result = parseInt(val);
            if (isNaN(result)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "id no es un numero"
                });
                return z.NEVER;
            }
            return result;
        }),
    })
});

export {
    createDaySchema,
    updateDayStatuschema,
    updateDayRouteschema,
    getDaysSchema,
    updateFinallyDaySchema,
    updateDaySchema,
    getDaySchema
}