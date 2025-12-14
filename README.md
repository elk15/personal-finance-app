# 💰 Personal Finance Tracker

A modern, full-stack personal finance application that helps users manage budgets, track expenses, and monitor bills. Built with React, TypeScript, and Supabase.

[Finance Tracker Demo](https://personal-finance-app-alpha-wheat.vercel.app)

<img width="1920" height="1079" alt="image" src="https://github.com/user-attachments/assets/b2683252-a299-4420-8ead-2d2c578b9d9b" />

## ✨ Features

- 📊 **Budget Management** - Create and track multiple budgets with visual progress indicators
- 💸 **Expense Tracking** - Log expenses and categorize them by budget
- 📅 **Bill Management** - Never miss a payment with bill tracking and reminders
- 📈 **Data Visualization** - Interactive charts powered by Recharts
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and Styled Components
- 🔐 **Secure Authentication** - User authentication with Supabase
- 🚀 **Guest Demo** - Try the app instantly without signing up (data expires in 24 hours)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

**Frontend:**
- [React 18](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Client-side routing
- [Styled Components](https://styled-components.com/) - CSS-in-JS styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Recharts](https://recharts.org/) - Data visualization
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Notifications
- [Luxon](https://moment.github.io/luxon/) - Date handling

**Backend:**
- [Supabase](https://supabase.com/)
  - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

**Deployment:**
- [Vercel](https://vercel.com/) - Frontend hosting

## 🚀 Live Demo

**[View Live App →](https://personal-finance-app-alpha-wheat.vercel.app)**

Try the guest demo to explore features without creating an account!

## 📸 Screenshots

| Expense Tracking | Budget Dashboard | Bill Management |
|-----------------|------------------|-----------------|
| <img width="1929" height="1082" alt="image" src="https://github.com/user-attachments/assets/f10c5444-39a4-42a6-8d30-014b80635abd" /> | <img width="1923" height="1081" alt="image" src="https://github.com/user-attachments/assets/bf4313e9-c5fd-4f9f-88ab-3e8eea4d0d67" /> | <img width="1916" height="1079" alt="image" src="https://github.com/user-attachments/assets/5074971a-3b1f-48a2-b4c3-8a2cb2ceecaa" /> |

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/elk15/personal-finance-app.git
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up Supabase**
   
   Create a new project at [supabase.com](https://supabase.com)
   
   Run the SQL schema.
   
   Enable Anonymous sign-ins in Authentication → Providers

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run the development server**
```bash
   npm run dev
```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Input Validation** - Database-level constraints prevent invalid data
- **Rate Limiting** - Built into Supabase API
- **Guest Account Cleanup** - Automatic deletion after 24 hours
- **Secure Authentication** - Handled by Supabase Auth

## 🎯 Key Features Explained

### Guest Demo Mode
Users can try the app without signing up. Guest accounts are automatically created and deleted after 24 hours, with limits on the number of budgets/expenses they can create.

### Budget Tracking
Create budgets for different categories (food, transport, entertainment, etc.) and track spending against each budget with visual progress bars.

### Expense Management
Log individual expenses, assign them to budgets, and view spending patterns over time with interactive charts.

### Bill Reminders
Track recurring and one-time bills with due date reminders to never miss a payment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**

- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- LinkedIn: [linkedin.com/in/elina-papadimitriou-0bb235176](https://linkedin.com/in/elina-papadimitriou-0bb235176)
- GitHub: [@elk15](https://github.com/elk15)

## 🙏 Acknowledgments

- Design inspiration from various personal finance apps
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components styled with Tailwind CSS and Styled Components

---

⭐ **If you found this project useful, please consider giving it a star!**



