import { z } from 'zod'

export const appConfigSchema = z.object({
  PORT: z.coerce.number().default(3333),
  PREFIX: z.string().default('api'),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().default('dev')
})

export type AppConfig = z.infer<typeof appConfigSchema>