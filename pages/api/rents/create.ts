import prisma from "../../../lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";
import { unstable_getServerSession } from "next-auth";
import {authOptions} from '../auth/[...nextauth]'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method === 'POST'){

    const session = await unstable_getServerSession(req,res,authOptions)
    if(!session) res.status(401).json('You need to login!!!')

    const {name, price } = req.body

    try {
      await prisma?.rent.create({
        data:{
          name: name,
          price: price,
          userId: session?.user?.id
        }
      })
      res.status(200).json('Congrats it works !!')
    } catch (error) {
      console.log(error);
      
      res.status(400).json(error)
    }
  
  }

  if(req.method === 'GET'){
    console.log(req.cookies['next-auth.session-token'])
    res.json('hello')
  }
  
}
