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
        orderTo:{
          select:{
            name: true,
          }
        },
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
        orderTo: {
          select:{
            id: true,
            name: true
          }
        },
        product:{
          select:{
            id: true,
            name: true
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
.mutation('create',{
  input: z.object({
    productId: z.string(),
    orderToUserId: z.string()
  }),
  async resolve({input, ctx}){
    // if(ctx.session.user.id ===)
    try {
      const newOrder = await ctx?.prisma?.order.create({
        data:{
          orderToUserId: input.orderToUserId,
          userId: ctx.session?.user?.id!,
          productId: input.productId,
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
