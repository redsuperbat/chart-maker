import rfdc from 'rfdc';
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

export const getRandomColor = () => {
  return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(
    255
  )})`;
};

export const randomNumber = (n: number) => {
  return Math.round(Math.random() * n);
};

export const deepCopy = <T>(obj: T) => {
  const __deepCopy = rfdc();
  return __deepCopy(obj);
};
