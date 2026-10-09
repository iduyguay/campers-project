# Campers Project

Desktop camper rental frontend built with React and Vite, based on the supplied TravelTrucks design.

## Features

- Home page with navigation and a catalog link.
- Camper listings, server-side filters and Load more pagination.
- Favorites preserved across page reloads.
- Camper details with vehicle information, selectable photo gallery and reviews.
- Booking form with name and email validation and a success notification.
- Loading, empty, retry and not-found states.

The booking form stores submissions locally in the browser. It does not send a real rental reservation to a server.

## Technologies

React, Vite, Redux Toolkit, Redux Persist, React Router, Axios and CSS Modules.

## API

The assignment API is `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`.

- `GET /campers`: listings, filters and pagination.
- `GET /campers/:id`: camper details.

## Run locally

Use Node.js 20.19+ or a current supported LTS release.

```sh
npm ci
npm run dev
```

```sh
npm run verify
npm run lint
npm run build
npm run preview
```

## Deployment

Import this repository in Vercel, select the Vite preset, use `npm run build` as the build command and `dist` as the output directory. The root directory is the repository root.

The API URL has a default value, so an environment variable is not required. An optional `VITE_API_KEY` can override the MockAPI project ID. Variables prefixed with `VITE_` are visible in the client bundle.

`vercel.json` includes the rewrite required to open and reload catalog and detail routes directly.

## Links

- Repository: [iduyguay/campers-project](https://github.com/iduyguay/campers-project)
- Live website: deployment pending.
- [GitHub profile](https://github.com/iduyguay)
- [LinkedIn](https://www.linkedin.com/in/ipekduyguay/)

## Author and credits

Adaptation: **İpek Duygu Aykaş**.

Adapted from [neoversity-woolf/travel-trucks-app](https://github.com/neoversity-woolf/travel-trucks-app). Original author: yaroslav.kosytsia (2024). The original MIT license is preserved in `LICENSE`.