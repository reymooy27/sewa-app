import { createRouter } from "../createRouter";
import {z} from 'zod'

export const productRouter = createRouter()

.query('get-products',{
  async resolve({ctx}){
    const allProducts = await ctx?.prisma?.rent.findMany({
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

    return allProducts
  }
})
.query('get-my-products',{
  async resolve({ctx}){
    const myProducts = ctx?.prisma?.rent.findMany(
    {
      where:{
        userId: ctx?.session?.user?.id
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

    return myProducts;
  }
})
.mutation('create', {
    input: z
      .object({
        name: z.string(),
        price: z.number()
      }),
    async resolve({ input,ctx }) {

      const createdProduct = await ctx?.prisma?.rent.create({
        data:{
          name: input.name,
          price: input.price,
          userId: ctx?.session?.user?.id
        }
      })

    return createdProduct
    },
  })