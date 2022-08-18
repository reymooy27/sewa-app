import { createRouter } from "../createRouter";
import {z} from 'zod'

export const productRouter = createRouter()

.query('get-products',{
  async resolve({ctx}){
    const allProducts = await ctx?.prisma?.product.findMany({
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
.query('get-product',{
  input: z.object({
    id: z.string()
  }),
  async resolve({input,ctx}){
    const product = await ctx?.prisma?.product.findUnique({
      where:{
        id: input.id
      }
    })
    return product
  }
})
.query('get-my-products',{
  async resolve({ctx}){
    if (!ctx.session) return 'You need to login'
    
    const myProducts = ctx?.prisma?.product.findMany(
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
      if (!ctx.session) return 'You need to login'

      const createdProduct = await ctx?.prisma?.product.create({
        data:{
          name: input.name,
          price: input.price,
          userId: ctx?.session?.user?.id
        }
      })

    return createdProduct
    },
  })
  .mutation('delete',{
    input: z.object({
      id: z.string()
    }),
    async resolve({input, ctx}){
      if (!ctx.session) return 'You need to login'

      const product = await ctx?.prisma?.product.findFirst({
        where:{
          id: input.id,
          userId: ctx?.session?.user?.id
        }
      })

      if(!product){
        return 'You cannot delete this'
      }

      await prisma?.product.delete({
        where:{
          id: product?.id
        }
      })

      return 'Deleted'
    }
  })
  .mutation('update',{
    input: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number()
    }),
    async resolve({input, ctx}){
      if (!ctx.session) return 'You need to login'
      
      await ctx?.prisma?.product.update({
        where:{
          id: input.id
        },
        data:{
          name: input.name,
          price: input.price
        }
      })

      return 'Updated'
    }
  })