import { Module } from '@nestjs/common';
import Stripe from 'stripe';

@Module({
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => {
        return new Stripe(process.env.sk_test, {});
      },
    },
  ],
  exports: ['STRIPE_CLIENT'],
})
export class StripeModule { }