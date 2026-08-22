export const PADDLE_PRICE_ID = 'pri_01kzx0qxd5b88et0hx';
export const PADDLE_SANDBOX_TOKEN = 'test_7d279a61a70991c7904d9fcb6c5'; // Replace with your sandbox API key

declare global {
  interface Window {
    Paddle?: {
      Environment: { set: (env: string) => void };
      Initialize: (opts: { token: string }) => void;
      Checkout: {
        open: (opts: {
          items: { priceId: string; quantity: number }[];
          settings?: {
            displayMode?: string;
            theme?: string;
            successUrl?: string;
          };
        }) => void;
      };
    };
  }
}

let initialized = false;

export function initPaddle(): void {
  if (initialized || !window.Paddle) return;
  window.Paddle.Environment.set('sandbox');
  window.Paddle.Initialize({ token: PADDLE_SANDBOX_TOKEN });
  initialized = true;
}

export function openPaddleCheckout(): void {
  initPaddle();
  if (!window.Paddle) {
    console.error('Paddle failed to load');
    return;
  }
  window.Paddle.Checkout.open({
    items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
    settings: {
      displayMode: 'overlay',
      theme: 'dark',
    },
  });
}
