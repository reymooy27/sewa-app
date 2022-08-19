import { createRouter } from "../createRouter";
import {z} from 'zod'

export const orderRouter = createRouter()
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
.mutation('create',{
  input: z.object({
    productId: z.string(),
    orderToUserId: z.string()
  }),
  async resolve({input, ctx}){
    if(!ctx.session) return 'You need to login'

    // if(ctx.session.user.id ===)

    const newOrder = await ctx?.prisma?.order.create({
      data:{
        orderToUserId: input.orderToUserId,
        userId: ctx.session?.user?.id!,
        productId: input.productId,
      }
    })

    return newOrder
  }
})

