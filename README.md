# Web Push Notifications with Next.js


## Getting Started

After installing the dependencies, run the command:

```bash
web-push generate-vapid-keys
```

This will generate the `PUBLIC_KEY` and `PRIVATE_KEY` for the VAPID protocol.

Next, update the `PUBLIC_KEY` and `PRIVATE_KEY` in the `server.js`, `page.js` and `src/app/api/send-notification/route.js` files.


Finally, run the development server:

```bash
npm run dev
```
