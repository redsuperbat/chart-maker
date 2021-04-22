import { Subscription } from 'rxjs/internal/Subscription';

export const unsubscribeCollection = (subs: SubscriptionCollection) =>
  Object.values(subs)
    .filter(
      (sub) =>
        sub instanceof Subscription && typeof sub.unsubscribe === 'function'
    )
    .forEach((sub) => sub.unsubscribe());

export interface SubscriptionCollection {
  [key: string]: Subscription;
}
