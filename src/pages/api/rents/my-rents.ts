import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await unstable_getServerSession(req,res,authOptions)
  if(!session) res.status(401).json('You need to login bruh')

  try {
    const myRents = await prisma?.rent.findMany(
    {
      where:{
        userId: session?.user?.id
      },
      include:{
        user:{
          select:{
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })
    res.status(200).json(myRents)
  } catch (error) {
    res.status(400).json('Error')
  }
}