# SchoolMate Brand Assets

Modern, premium logo system for the SchoolMate School Management Platform.

## Files

| File | Use case |
|------|----------|
| `schoolmate-logo-light.svg` | Full logo (icon + wordmark) on white/light backgrounds |
| `schoolmate-logo-dark.svg` | Full logo on dark backgrounds |
| `schoolmate-icon.svg` | Icon only — light mode |
| `schoolmate-icon-dark.svg` | Icon only — dark mode |
| `schoolmate-favicon.svg` | Browser tab / PWA favicon (32×32 optimized) |

## Design

- **Icon:** Graduation cap + open book, unified in one geometric mark
- **Community:** Three connected nodes represent students, teachers, and parents
- **Typography:** Inter — **School** (700) + **Mate** (500)
- **Colors:** `#8B5CF6` primary, `#A78BFA` secondary, `#7C3AED` accent

## Usage in Angular

```html
<img src="assets/brand/schoolmate/schoolmate-logo-light.svg" alt="SchoolMate" height="40" />
<img src="assets/brand/schoolmate/schoolmate-icon.svg" alt="" width="32" height="32" />
```

## Favicon

Replace `src/favicon.ico` or add to `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="assets/brand/schoolmate/schoolmate-favicon.svg" />
```
