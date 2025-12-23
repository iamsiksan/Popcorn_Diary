src/
│
├── api/                       # Axios & API services
│   ├── axiosInstance.js
│   └── movieService.js
│
├── app/                       # Redux store setup
│   └── store.js
│
├── assets/                    # Static assets
│   ├── images/
│   │   └── logo.png
│   └── icons/
│
├── components/                # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── UnderConstruction.jsx
│   └── Loader.jsx
│
├── layouts/                   # App layouts (VERY IMPORTANT)
│   ├── AuthLayout.jsx
│   ├── ProtectedLayout.jsx
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx
│
├── pages/                     # Route pages (NO shared UI here)
│   ├── Home.jsx
│   ├── Favorites.jsx
│   ├── Watchlist.jsx
│   ├── Profile.jsx
│   │
│   ├── auth/                  # Auth-related pages
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   │
│   └── admin/                 # Admin pages
│       ├── AdminDashboard.jsx
│       └── ManageUsers.jsx
│
├── features/                  # Redux slices
│   ├── auth/
│   │   └── authSlice.js
│   ├── movies/
│   │   └── movieSlice.js
│   └── lists/
│       └── watchlistSlice.js
│
├── hooks/                     # Custom hooks
│   └── useAuth.js
│
├── utils/                     # Helper functions
│   └── formatDate.js
│
├── App.jsx                    # Routes + layouts only
├── main.jsx                   # ReactDOM render
│
└── index.css                  # Tailwind base styles
