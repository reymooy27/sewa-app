import { createRouter } from "../createRouter";
import {z} from 'zod'
import { TRPCError } from "@trpc/server";

export const shopRouter = createRouter()
.middleware(async ({ctx,next})=>{
  if(!ctx.session){
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to login'
      })
    }
    return next()
})
.mutation('create',{
  input: z.object({
    name: z.string()
  }),
  async resolve({ctx, input}){
    const user = await ctx.prisma?.user.findUnique({
      where:{
        id: ctx.session?.user?.id!
      },
      include:{
        shop: true
      }
    })

    const shopHasSameName = await ctx?.prisma?.shop.findFirst({
      where:{
        name: input.name
      }
    })

    if(user?.shop){
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Cannot create another shop'
      })
    }
    
    if(shopHasSameName){
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Name already used'
      })
    }

    try {
      const newShop = await ctx.prisma?.shop.create({
        data:{
          name: input?.name,
          userId: ctx?.session?.user?.id!
        }
      })
      return newShop
    } catch (error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'There is something wrong'
      })
    }
  }
})
.query('get-my-shop',{
  async resolve({ctx}){
    try {
      const myShop = ctx.prisma?.shop.findUnique({
        where:{
          id: ctx?.session?.user?.shopId!
        }
      })
      return myShop
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot get what you looking for'
      })
    }
  }
})