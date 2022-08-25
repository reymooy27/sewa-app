import { createRouter } from "../createRouter";
import {z} from 'zod'
import { TRPCError } from "@trpc/server";

export const orderRouter = createRouter()
.middleware(async ({ctx,next})=>{
  if(!ctx.session){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to login'
      })
    }
    return next()
})
.query('get-orders',{
  async resolve({ctx}){
    const allOrders = await ctx?.prisma?.order?.findMany({
      include:{
        user:{
          select:{
            name: true
          }
        },
        product:{
          select:{
            name: true
          }
        }
      }
    })
    return allOrders
  }
})
.query('get-order',{
  input: z.object({
    id: z.string(),
  }),
  async resolve({ctx,input}){
    try {
      const o = await ctx.prisma?.order.findUnique({
        where:{
          id: input.id
        }
      })
      return o
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot find what you looking for',
      })
    }
  }
})
.query('get-my-orders',{
  async resolve({ctx}){
    try {
      const myOrders = await ctx.prisma?.order.findMany({
      where:{
        userId: ctx?.session?.user?.id!
      },
      include:{
        product:{
          select:{
            id: true,
            name: true
          }
        },
        shop:{
          select:{
            name: true,
            id: true
          }
        }
      }
    })
    return myOrders
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot find what you looking for',
      })
    }
    
  }
})
.query('get-my-shop-orders',{
  async resolve({ctx}){
    try {
      const myShopOrders = await ctx.prisma?.order.findMany({
      where:{
        shopId: ctx?.session?.user?.shopId!
      },
      include:{
        product:{
          select:{
            id: true,
            name: true
          }
        },
        user:{
          select:{
            name: true,
            image: true
          }
        },
        shop:{
          select:{
            name: true,
            id: true
          }
        }
      }
    })
    return myShopOrders
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot find what you looking for',
      })
    }
    
  }
})
.mutation('create',{
  input: z.object({
    productId: z.string(),
    shopId: z.string(),
  }),
  async resolve({input, ctx}){
    try {
      const newOrder = await ctx?.prisma?.order.create({
        data:{
          userId: ctx.session?.user?.id!,
          productId: input.productId,
          shopId: input.shopId
        }
      })
      return newOrder
    } catch (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'There is something wrong',
        cause: error
      })
    }
  }
})
.mutation('cancel-order',{
  input: z.object({
    id: z.string()
  }),
  async resolve({ctx, input}){
    try {
      await ctx.prisma?.order.delete({
        where:{
          id: input.id
        }
      })
      return 'Canceled'
    } catch (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'There is something wrong',
        cause: error
      })
    }
  }
})
