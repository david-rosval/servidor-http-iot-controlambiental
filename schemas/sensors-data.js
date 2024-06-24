import z from 'zod'

const sensorsDataSchema = z.object({
  temperature: z.number({
    invalid_type_error: 'this has to be a number',
    required_error: 'temperature is required'
  }),
  humidity: z.number({
    invalid_type_error: 'this has to be a number',
    required_error: 'humidity is required'
  }).nonnegative({ message: 'negative number invalid' }),
  ammonia: z.number({
    invalid_type_error: 'this has to be a number',
    required_error: 'ammonia is required'
  }).nonnegative({ message: 'negative number invalid' })
})

export function validateSensorsData (object) {
  return sensorsDataSchema.safeParse(object)
}
