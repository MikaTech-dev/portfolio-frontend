# MikaTech Portfolio

Personal engineering portfolio for Sam-Lebechukwu Ikenna, built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. Deployed to Cloudflare Workers using OpenNext.

## Architecture

The project uses Next.js App Router with vertical section components and server-side API proxy routes.

### Client components

- Hero section with career highlights, resume access, and verified profile links.
- Personal projects section featuring live demos, open-source utilities, and hackathon research builds with reactive corner spotlight borders.
- Commercial client work showcase covering production platforms such as KDK Phones and Gadgets and Klaro.ng.
- Contact section with client-side form validation and instant feedback.
- Status indicator that periodically polls upstream backend availability.
- Keep Android Open countdown banner and interactive background canvas.

### Server API proxy

To prevent exposing sensitive credentials in browser bundles, the client does not query the upstream mailing service directly. Requests pass through local Next.js route handlers running inside the Cloudflare Worker:
- `POST /api/contact`: Accepts contact form submissions, attaches the secret `authv1` header on the server, and forwards the payload to `https://mail.mikatech.top/api/mail`.
- `GET /api/status`: Forwards health check requests to `https://mail.mikatech.top/api` with server credentials and returns service availability.

## Environment configuration

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Variables

- `API_KEY`: Secret authentication key for the upstream mailing service. In development, put this in `.env.local`. In production, set this as an encrypted secret in the Cloudflare Dashboard under Workers & Pages > Settings > Variables and Secrets. Never expose this variable to the client.
- `API_URL` and `NEXT_PUBLIC_API_URL`: Target endpoint for the upstream API (defaults to `https://mail.mikatech.top`).
- `NEXT_PUBLIC_DELAY`: Polling interval in milliseconds for the backend status indicator (default: 60000).
- `NEXT_PUBLIC_RECIPIENT`: Recipient email address for contact form submissions.

## Development and deployment

### Local development

```bash
npm run dev
```

Runs the development server with Turbopack at `http://localhost:3000`.

### Local production test

```bash
npm run build
npm run start
```

### Cloudflare Worker build

```bash
npm run build:cf
```

Builds the Next.js application and compiles the Cloudflare Worker bundle inside `.open-next/worker.js`.

### Cloudflare deployment

```bash
npm run deploy
```

Builds and deploys the worker to Cloudflare Workers and Pages using OpenNext and Wrangler.

### Code quality

```bash
npx @biomejs/biome check
```
