import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if(!session) return res.status(401).json('You need to login')

  const {id} = req.query

  const {name, price} = req.body

  if(req.method === 'PUT'){
    try {
      await prisma?.rent.update({
        where:{
          id: id
        },
        data:{
          name: name,
          price: price
        }
      })
      res.status(200).json('Updated')
    } catch (error) {
      console.log(error)
      res.status(400).json('Error')
    }
  }
}