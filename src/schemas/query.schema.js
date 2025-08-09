const { z } = require("zod");

const orderByFieldEnum = z.enum(['id', 'title', 'completed', 'createdAt']);
const orderByDirectionEnum = z.enum(['asc', 'desc']);
const booleanEnum = z.enum(['true', 'false']);

const orderBySchema = z
  .string()
  .refine(val => {
    const [field, direction] = val.split('-');
    return (
      val.includes('-') &&
      orderByFieldEnum.safeParse(field).success &&
      orderByDirectionEnum.safeParse(direction).success
    );
  }, {
    message: "Invalid orderBy format. Expected 'field-direction'"
  })
  .optional()
  .transform(val => {
    if (!val) return { field: "createdAt", direction: "desc" };
    const [field, direction] = val.split("-");
    return { field, direction };
  });

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(5),
});

const filterSchema = z.object({
  title: z.string().optional(),
  completed: booleanEnum.optional().transform(val => {
    if(val === undefined) return undefined;
    return val !== "false";
  }),
  createdFrom: z.coerce.date().optional(),
  createdTo: z.coerce.date().optional(),
});

const todoQuerySchema = z.object({
  ...paginationSchema.shape,
  orderBy: orderBySchema,
  ...filterSchema.shape,
})

module.exports = { todoQuerySchema };