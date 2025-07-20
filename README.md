# Evilkop Sentinels - Digital Underground Portfolio

A futuristic, hackercore-inspired portfolio website built with Next.js, Tailwind CSS, and Supabase.

## 🚀 Features

- **Matrix Rain Effect**: Toggleable animated background with falling green characters
- **Cyberpunk Aesthetic**: Neon glows, cyber borders, and futuristic styling
- **Admin Dashboard**: Password-protected content management system
- **Blog System**: Dynamic blog posts with tags and real-time updates
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes
- **Fira Code Font**: Monospace font throughout for that authentic hacker feel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Backend**: Supabase (Database, Auth, Real-time)
- **Font**: Fira Code
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd evilkop-sentinels
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up Supabase:
   - Create a new Supabase project at https://supabase.com
   - Go to Settings > API to get your project URL and anon key
   - Update the credentials in `lib/supabase.ts` if different from the provided ones
   - Run the SQL script in `scripts/create-tables.sql` in your Supabase SQL editor

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Admin Access

- Navigate to `/admin`
- Enter password: 
- Manage blog posts through the dashboard

## 🌐 Pages

- **Home** (`/`): Welcome message with Matrix rain effect
- **About** (`/about`): Bio, skills, education, and social links
- **Blog** (`/blog`): Dynamic blog posts from Supabase
- **Admin** (`/admin`): Password-protected dashboard for content management

## 🎨 Customization

### Matrix Rain Effect
- Toggle on/off from the homepage
- Customizable characters and speed in `components/matrix-rain.tsx`

### Theme Colors
- Modify CSS variables in `app/globals.css`
- Primary color scheme: Black background with green accents

### Content
- Update bio information in `app/about/page.tsx`
- Modify welcome message in `app/page.tsx`

## 📊 Supabase Schema

### Posts Table
\`\`\`sql
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
\`\`\`

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with default settings
4. Your site will be live!

### Environment Variables
The Supabase credentials are already configured in the code. If you're using a different Supabase project, update `lib/supabase.ts`.

## 🎯 Features Breakdown

### Matrix Rain
- Canvas-based animation
- Customizable characters and colors
- Performance optimized
- Toggleable on/off

### Admin Dashboard
- Secure password authentication
- CRUD operations for blog posts
- Tag management
- Real-time updates

### Responsive Design
- Mobile-first approach
- Cyberpunk aesthetic maintained across all screen sizes
- Touch-friendly interface

## 🔧 Development

### Adding New Pages
1. Create new page in `app/` directory
2. Add navigation link in `components/navbar.tsx`
3. Follow the cyberpunk styling conventions

### Modifying Styles
- Global styles: `app/globals.css`
- Component styles: Use Tailwind classes with custom cyber theme
- Custom animations and effects are defined in globals.css

## 📱 Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## 🎵 Optional Enhancements

- Add background music toggle
- Implement visitor analytics
- Add more interactive effects
- Expand admin dashboard features

## 🔧 Troubleshooting

### Common Issues

1. **Supabase Connection Issues**
   - Verify your Supabase URL and API key in `lib/supabase.ts`
   - Ensure RLS policies are set up correctly

2. **Matrix Effect Not Working**
   - Check browser console for errors
   - Ensure Canvas API is supported

3. **Admin Login Not Working**
   - Verify the password is exactly: `Thierry054#`
   - Check browser localStorage for authentication state

### Development Commands

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
\`\`\`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with 💚 by Evilkop Sentinels**

*"In the digital underground, code is poetry and exploits are art."*
