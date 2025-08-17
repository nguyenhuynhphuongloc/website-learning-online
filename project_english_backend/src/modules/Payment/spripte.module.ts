import { Module } from '@nestjs/common';
import Stripe from 'stripe';

@Module({
  providers: [
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => {
        return new Stripe('sk_test_51RhGJOPJgMEbAPth32y9jJ9HbHvaJKPc8m5eY6YnR7Ve7JQr3lpf4acHFwRDRMahxD3fpZhO3vHX4XtY6399rXGp00MVvPxfRB', {});
      },
    },
  ],
  exports: ['STRIPE_CLIENT'],
})
export class StripeModule { }