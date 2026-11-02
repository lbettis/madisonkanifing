# Madison–Kanifing Sister City — Website

Redesigned website for the Madison–Kanifing Sister City Committee (madisonkanifing.org).

It is a plain static site — HTML, CSS and a small JavaScript file — with no build step,
database or plugins, so it is fast, secure and can be hosted anywhere (GitHub Pages,
Netlify, Cloudflare Pages, or any standard web host).

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | Our story, leadership team, by-laws |
| `programs.html` | Education, Health, Culture, Agriculture, Civic & Economic |
| `committees.html` | Planning, Liaison, Outreach and Technology committees |
| `news.html` | News listing |
| `news-trade-mission.html` | Article: Wisconsin trade mission to West Africa |
| `news-medical-supplies.html` | Article: Medical supplies arrive in The Gambia |
| `gallery.html` | Filterable photo gallery with lightbox |
| `scholarship.html` | Fatoumatta Jallow Memorial Scholarship Fund |
| `contact.html` | Contact details and message form |

## Folders

- `assets/css/styles.css` — all styles; colors and fonts are set as variables at the top
- `assets/js/main.js` — mobile menu, scroll animations, gallery and contact form
- `assets/img/` — photos, partner logos and the site logo (`logo.svg`)
- `assets/docs/` — by-laws PDF

## Editing tips

- The header and footer are repeated in every page. When changing a menu item,
  phone number or email, update it in all `.html` files (search-and-replace works well).
- To add a news story, copy `news-medical-supplies.html`, change the text and photos,
  and add a card for it on `news.html` (and optionally the home page).
- To add a gallery photo, put the image in `assets/img/` and copy one of the
  `<figure>` lines in `gallery.html`. The `data-cat` value sets its filter
  (`delegations`, `health`, `culture` or `community`).
- The contact form opens the visitor's email app addressed to the committee inbox.
  To receive submissions directly instead, connect a form service such as Formspree
  or Netlify Forms.

## Preview locally

Open `index.html` in a browser, or run a local server from this folder:

```bash
npx serve .
```

## Publishing on cPanel (kanifing.ljdesignz.com)

The live copy is deployed with cPanel's Git Version Control. `.cpanel.yml` copies only
the website files into the subdomain's document root, `/media/lbettis/kanifing.ljdesignz.com/`.

1. In cPanel, open **Git™ Version Control** and click **Create**.
2. Clone URL: `https://github.com/lbettis/madisonkanifing.git` (public, so no key is needed).
   Repository path: `repositories/madisonkanifing`. Name: `madisonkanifing`.
3. Click **Manage** > **Pull or Deploy** > **Deploy HEAD Commit**.
4. After each new push to GitHub: **Update from Remote**, then **Deploy HEAD Commit**.

When HTTPS works on the subdomain, un-comment the three HTTPS lines in `.htaccess`.
If the site later moves to madisonkanifing.org, change `DEPLOYPATH` in `.cpanel.yml` and
the addresses in `robots.txt` and `sitemap.xml`.

## Publishing with GitHub Pages (alternative)

In the repository on GitHub: **Settings → Pages → Deploy from a branch**, choose the
branch and `/ (root)`. To use the madisonkanifing.org domain, add it under
**Custom domain** and point the domain's DNS records to GitHub Pages.
