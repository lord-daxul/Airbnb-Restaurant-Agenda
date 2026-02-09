Put image assets here and reference them from the app using paths under `/images/`.

Suggested structure:

- public/images/restaurants/    # restaurant cover images (e.g. 101.jpg, 102.jpg)
 - public/images/restaurants/    # restaurant cover images (e.g. 101.avif, 102.avif)
- public/images/home/           # images used on the Home page cards (e.g. eventos.jpg)
 - public/images/home/           # images used on the Home page cards (e.g. eventos.avif)
- public/images/avatars/        # user avatars (e.g. user_david.jpg)
 - public/images/avatars/        # user avatars (e.g. user_david.avif)

How to reference in code:

- In data (e.g. `src/data/restaurants.js`):
  cover: '/images/restaurants/101.avif'

- In components (JSX):
  <img src="/images/home/eventos.jpg" alt="Eventos" />

Notes:
- Files placed in `public/` are served as static assets. Use leading slash in paths.
- If you upload images, keep filenames predictable (use the restaurant `id` or a slug).

Example mapping for the sample restaurants provided:
- Restaurant id 101 -> `/images/restaurants/101.jpg`
- Restaurant id 102 -> `/images/restaurants/102.jpg`
- Restaurant id 103 -> `/images/restaurants/103.jpg`

When you have the image filenames, tell me the names and I can update `src/data/restaurants.js` and `src/Home.js` to use the local images.