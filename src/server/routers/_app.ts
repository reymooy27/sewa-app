import { createRouter } from '../createRouter';
import { productRouter } from './productRouter';
import superjson from 'superjson';
import { orderRouter } from './orderRouters';
import { shopRouter } from './shopRouters';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    resolve() {
      return 'yay!';
    },
  })
  .merge('product.', productRouter)
  .merge('order.', orderRouter)
  .merge('shop.', shopRouter)

export type AppRouter = typeof appRouter;