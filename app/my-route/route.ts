import { getPayloadInstance } from '@/trpc/init'

export const GET = async (request: Request) => {
  const payload = await getPayloadInstance()

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
