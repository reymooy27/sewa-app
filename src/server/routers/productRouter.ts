import { createRouter } from "../createRouter";

export const productRouter = createRouter()

.query('get-products',{
  async resolve({ctx}){
    const allProducts = ctx.prisma?.rent.findMany()

    return allProducts
  }
})