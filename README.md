# Godavari Wave Technologies - Corporate Website & Enterprise CRM

Official digital engineering portal and enterprise HR CRM platform for **Godavari Wave Technologies Private Limited** (Hyderabad Innovation Hub & Rajahmundry HQ).

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS & Modern Dark Ocean Glass Theme
- **Animations & Icons**: Framer Motion & Lucide Icons

## Environment Configuration
Credentials for the Lead & HR CRM Dashboard are securely managed via environment variables. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

And set your administrative credentials in `.env`:
```env
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
```

## Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
