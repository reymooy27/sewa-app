import { createRouter } from "../createRouter";
import {z} from 'zod'
import { TRPCError } from "@trpc/server";

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
    try {
      const product = await ctx?.prisma?.product.findUnique({
        where:{
          id: input.id
        }
      })
      return product
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot found what you are looking for',
        cause: error
      })
    }
  }
})
.middleware(async ({ctx,next})=>{
  if(!ctx.session){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to login'
      })
    }
    return next()
})
.query('get-my-products',{
  async resolve({ctx}){
    try {
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
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot found what you are looking for',
        cause: error
      })
    }
  }
})
.mutation('create', {
    input: z
      .object({
        name: z.string(),
        price: z.number()
      }),
    async resolve({ input,ctx }) {
      try {
        const createdProduct = await ctx?.prisma?.product.create({
          data:{
            name: input.name,
            price: input.price,
            userId: ctx?.session?.user?.id
          }
        })
      return createdProduct
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There is something wrong',
          cause: error
        })
      }
    },
  })
  .mutation('delete',{
    input: z.object({
      id: z.string()
    }),
    async resolve({input, ctx}){
      try {
        const product = await ctx?.prisma?.product.findFirst({
          where:{
            id: input.id,
            userId: ctx?.session?.user?.id
          }
        })

        if(!product){
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot delete this',
          })
        }

        await prisma?.product.delete({
          where:{
            id: product?.id
          }
        })
        return 'Deleted'
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There is something wrong',
          cause: error
        })
      }
    }
  })
  .mutation('update',{
    input: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number()
    }),
    async resolve({input, ctx}){
      try {
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
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There is something wrong',
          cause: error
        })
      }
    }
  })