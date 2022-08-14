import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma?.rent.findMany({
      include:{
        user:{
          select:{
            id: true,
            name: true,
            image: true
          }
        }
      }
    })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(400).json('Something wrong')
  }
}