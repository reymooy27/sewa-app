import { createRouter } from '../createRouter';
import { productRouter } from './productRouter';
import superjson from 'superjson';
import { orderRouter } from './orderRouters';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    resolve() {
      return 'yay!';
    },
  })
  .merge('product.', productRouter)
  .merge('order.', orderRouter)

export type AppRouter = typeof appRouter;