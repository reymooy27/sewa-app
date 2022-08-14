import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await unstable_getServerSession(req,res,authOptions)
  if(!session) return res.status(401).json('You need to login bruh')

  if(req.method === 'DELETE'){
    
    const rent = await prisma?.rent.findFirst({
      where:{
        id: req.query.id,
        userId: session?.user?.id
      }
    })

    if(!rent){
      return res.status(400).json('You cannot delete this')
    }

    try {
      await prisma?.rent.delete({
        where:{
          id: rent?.id
        }
      })
      res.status(200).json('deleted')
    } catch (error) {
      console.log(error)
      res.status(400).json('Error')
    }
  }else{
    res.json('Wrong method')
  }
}