import { createRouter } from '../createRouter';
import { productRouter } from './productRouter';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    resolve() {
      return 'yay!';
    },
  })
  .merge('product.', productRouter)

export type AppRouter = typeof appRouter;