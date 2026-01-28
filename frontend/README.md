## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

.
├── app/
│   ├── (auth)/                          # Route group for auth pages (no layout impact on URL)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx                   # Auth-specific layout (centered card, etc.)
│   │
│   ├── (main)/                          # Route group for main public pages
│   │   ├── page.tsx                     # Landing/Home page (/)
│   │   ├── about/
│   │   │   └── page.tsx                 # About page
│   │   └── layout.tsx                   # Main layout with Navbar
│   │
│   ├── (protected)/                     # Route group for authenticated users
│   │   ├── get-started/
│   │   │   └── page.tsx                 # Onboarding/Get started page
│   │   ├── movies/
│   │   │   ├── page.tsx                 # Movie recommendations dashboard
│   │   │   └── [id]/
│   │   │       └── page.tsx             # Individual movie detail page
│   │   ├── profile/
│   │   │   └── page.tsx                 # User profile page
│   │   └── layout.tsx                   # Protected layout (with auth check)
│   │
│   ├── (admin)/                         # Route group for admin pages
│   │   ├── admin/
│   │   │   ├── page.tsx                 # Admin dashboard home
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx             # Genre tracking analytics
│   │   │   └── users/
│   │   │       └── page.tsx             # User management dashboard
│   │   └── layout.tsx                   # Admin layout with sidebar
│   │
│   ├── api/                             # API Route Handlers
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts             # NextAuth.js handler (if using)
│   │   ├── movies/
│   │   │   └── route.ts                 # Movies API
│   │   ├── users/
│   │   │   └── route.ts                 # Users API
│   │   └── analytics/
│   │       └── route.ts                 # Analytics API
│   │
│   ├── globals.css                      # Global styles + Tailwind
│   ├── layout.tsx                       # Root layout
│   ├── loading.tsx                      # Global loading UI
│   ├── error.tsx                        # Global error boundary
│   └── not-found.tsx                    # 404 page
│
├── components/
│   ├── ui/                              # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── chart.tsx
│   │
│   ├── layout/                          # Layout components
│   │   ├── navbar.tsx                   # Main navigation bar
│   │   ├── footer.tsx                   # Footer component
│   │   ├── sidebar.tsx                  # Admin sidebar
│   │   └── mobile-nav.tsx               # Mobile navigation (sheet)
│   │
│   ├── auth/                            # Authentication components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── user-button.tsx              # Avatar dropdown (profile/logout)
│   │   └── auth-provider.tsx            # Auth context provider
│   │
│   ├── movies/                          # Movie-related components
│   │   ├── movie-card.tsx               # Individual movie card
│   │   ├── movie-grid.tsx               # Grid of movie cards
│   │   ├── movie-carousel.tsx           # Featured movies carousel
│   │   ├── movie-search.tsx             # Search component
│   │   ├── genre-filter.tsx             # Genre filter chips
│   │   └── recommendation-list.tsx      # Personalized recommendations
│   │
│   ├── admin/                           # Admin-specific components
│   │   ├── analytics-chart.tsx          # Genre tracking chart
│   │   ├── user-table.tsx               # User management table
│   │   ├── stats-cards.tsx              # Dashboard stat cards
│   │   └── delete-user-dialog.tsx       # Confirm delete dialog
│   │
│   └── shared/                          # Shared/common components
│       ├── page-header.tsx              # Reusable page header
│       ├── empty-state.tsx              # Empty state placeholder
│       ├── loading-spinner.tsx          # Loading indicator
│       └── confirm-dialog.tsx           # Reusable confirm dialog
│
├── lib/
│   ├── utils.ts                         # shadcn/ui utility (cn function)
│   ├── auth.ts                          # Auth configuration
│   ├── db.ts                            # Database connection
│   └── validations/                     # Zod schemas
│       ├── auth.ts
│       └── movie.ts
│
├── hooks/                               # Custom React hooks
│   ├── use-auth.ts                      # Auth hook
│   ├── use-movies.ts                    # Movies data hook
│   └── use-media-query.ts               # Responsive hook
│
├── types/                               # TypeScript types
│   ├── index.ts                         # Main types export
│   ├── user.ts
│   ├── movie.ts
│   └── api.ts
│
├── services/                            # API service functions
│   ├── movies.ts                        # Movie API calls
│   ├── users.ts                         # User API calls
│   └── analytics.ts                     # Analytics API calls
│
├── constants/                           # App constants
│   ├── navigation.ts                    # Nav links config
│   └── genres.ts                        # Movie genres
│
├── public/
│   ├── images/
│   │   └── logo.svg
│   └── ...
│
├── middleware.ts                        # Auth middleware for protected routes
├── next.config.ts
├── tailwind.config.ts
├── components.json                      # shadcn/ui config
├── tsconfig.json
└── package.json