import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const id = req.query.id

  try {
    const user = await prisma?.rent.findUnique({
      where:{
        id: id
      }
    })  
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json('Something wrong')
    
  }
}