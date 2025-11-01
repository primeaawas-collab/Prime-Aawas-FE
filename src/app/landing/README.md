# Prime Aawas Brand Landing Page

This is the public-facing brand/landing page for Prime Aawas property management application.

## Structure

The landing page is organized into modular, standalone components:

```
landing/
├── landing.component.ts/html/scss        # Main landing page container
├── header/                               # Sticky header with logo and CTA
├── hero-section/                         # Hero section with form
├── coverage-section/                     # Partner/coverage showcase
├── solutions-section/                    # Solutions grid with testimonials
├── protection-section/                   # "Hard to Place" protection section
├── integration-section/                  # Integration partners and CTA
├── features-section/                     # Key features showcase
├── blog-section/                         # Blog posts grid
└── footer/                               # Footer with links and social
```

## Routes

- **/** - Landing page (default route)
- All "Start your journey" buttons route to:
  - Development: `http://dev-app.primeaawas.com` (when running locally)
  - Production: `https://app.primeaawas.com` (when deployed)

## Features

- ✅ SEO-friendly structure
- ✅ Responsive design (mobile-first)
- ✅ Modern gradient designs
- ✅ Contact form integration ready
- ✅ App store links ready for configuration
- ✅ Blog section for content marketing
- ✅ Social media links
- ✅ Clean component architecture

## Customization

### Update App Store Links
Edit the following files:
- `footer/footer.component.ts` - Update `links` object (appStore, playStore)
- Navigation URLs are handled by `utils/app-navigation.service.ts`

### Update Contact Form
- `hero-section/hero-section.component.ts` - Add API integration in `onSubmit()` method

### App Navigation
- `utils/app-navigation.service.ts` - Controls routing to dev/prod app
  - Automatically detects environment (localhost = dev, else = prod)
  - Can be customized based on environment.production flag

### Update Blog Posts
- `blog-section/blog-section.component.ts` - Update `blogPosts` array or fetch from API

### Update Partners/Integrations
- `coverage-section/coverage-section.component.ts` - Update `partners` array
- `integration-section/integration-section.component.ts` - Update `integrations` array

## Styling

All components use SCSS with:
- CSS Grid and Flexbox for layouts
- CSS variables ready for theming
- Responsive breakpoints
- Modern gradients and animations

## Next Steps

1. Add real API endpoints for contact form
2. Integrate CMS for blog posts
3. Add analytics tracking
4. Add meta tags for SEO
5. Add structured data (JSON-LD)
6. Optimize images and assets

