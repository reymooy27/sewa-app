import { createRouter } from '../createRouter';
import { productRouter } from './productRouter';

export const appRouter = createRouter()
  .query('healthz', {
    resolve() {
      return 'yay!';
    },
  })
  .merge('product.', productRouter)

export type AppRouter = typeof appRouter;