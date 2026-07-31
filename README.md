# Fairgame Shop

Fairgame Shop is a responsive gaming store I built for the CPU4104 Web
Development assignment.

Only HTML5, CSS3 and vanilla JavaScript are used - no frameworks, no
libraries, no backend.

## How to open the website

Open `Pages/index.html` in a browser. No build step, no server needed.

## Pages

- `index.html` - home page and three featured products
- `products.html` - all 12 products
- `cart.html` - shopping cart and total price
- `about.html` - information about the shop
- `contact.html` - contact form with validation

## How it works

Every page shares the same header, navigation and footer. The header switches
to a hamburger menu on phones, moves the logo above the nav on tablets, and
goes back to the full side-by-side layout on desktop. Product cards go from
one column on phones to two on tablets and three on desktop.

`css/style.css` has all the styling, split into numbered sections (header,
hero, products, forms, cart, footer, responsive layouts, reduced motion).

`js/script.js` holds everything that makes the shop interactive:

- one array with all 12 products, used to build the product cards, the
  product detail popup and the cart
- add/remove/increase/decrease cart functions, saved in `localStorage` so the
  cart survives a page refresh
- contact form validation
- the small floating/particle animations around the hero heading and the
  active nav link

Buttons don't each get their own click listener - one listener on `document`
reads the button's `data-action` attribute and runs the right function.

## Accessibility

Skip link, visible focus states, `aria-expanded` on the mobile menu button,
alt text on every image, and `prefers-reduced-motion` turns off the
decorative animations for anyone who has that setting on.

## Still to do

- test every page at phone, tablet and desktop widths
- run Chrome Lighthouse and save before/after screenshots in `evidence/`
