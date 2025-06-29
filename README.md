# CrateMate – Smart Fruit Management System

**CrateMate** is a full-featured web application designed to help farmers and fruit vendors minimize spoilage, enhance storage practices, and improve profitability through intelligent, data-driven fruit management.

Turning Spoilage into Strength,
A smart app to reduce fruit spoilage and boost profits for small farmers

---

## Features

### Core Functionality
- **Shelf-Life Prediction**: AI-powered estimations tailored to various fruit types.
- **Spoilage Alerts**: Timely notifications to reduce wastage.
- **Smart Storage Tips**: Personalized guidance for optimal fruit preservation.
- **Inventory Tracking**: End-to-end management of fruit stock.
- **Analytics Dashboard**: Visual insights into performance and spoilage trends.
- **Market Prices**: Up-to-date pricing data from local markets.

### Advanced Capabilities
- **User Authentication**: Secure registration and login.
- **Real-time Sync**: Seamless data updates across devices.
- **Multi-language Interface**: Available in over eight regional languages.
- **Farm Profiles**: Customizable profiles for farms and farmers.
- **Data Import/Export**: Backup and restore data with ease.

---

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS  
- **Backend**: Supabase (PostgreSQL, real-time subscriptions)  
- **Authentication**: Supabase Auth  
- **Routing**: React Router DOM  
- **Icons**: Lucide React  
- **Notifications**: React Hot Toast  

---

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cratemate-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Configure environment variables:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run database migrations**
   - Navigate to the SQL Editor in Supabase
   - Execute the SQL files in the `supabase/migrations/` folder in sequence

5. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Database Schema Overview

### Tables
- **fruits**: Contains inventory records
- **alerts**: Stores user notifications and spoilage warnings
- **farm_profiles**: Information related to farms and users
- **analytics**: Logs daily usage and performance metrics
- **market_prices**: Current market pricing data

### Security
- Row-Level Security (RLS) enabled on all tables
- User-level access controls implemented
- Market data is globally readable but not writable

---

## Authentication

CrateMate uses Supabase Auth to manage users securely:
- Email and password authentication
- Farm-specific user profiles
- Secure session handling
- Password reset via email

---

## Application Modules

### Dashboard
- Summary of current inventory, expiring fruits, and active alerts
- Shortcuts for adding items or reviewing spoilage
- Recently triggered alerts

### Fruit Management
- Add and edit fruit entries with metadata
- Automated shelf-life estimation
- Context-aware storage recommendations
- Integrated search and inventory controls

### Analytics
- Track spoilage trends over time
- Estimate financial savings
- Visualize efficiency metrics
- Access historical data reports

### Market Integration
- Monitor local market prices in real time
- Quality and grade-specific pricing
- Alerts for favorable market conditions

---

## Localization

CrateMate supports the following Indian languages:
- English  
- Hindi (हिंदी)  
- Marathi (मराठी)  
- Gujarati (ગુજરાતી)  
- Tamil (தமிழ்)  
- Telugu (తెలుగు)  
- Kannada (ಕನ್ನಡ)  
- Bengali (বাংলা)  

---

## Real-time & Offline Capabilities

- Automatic data synchronization across sessions and devices
- Live updates for inventory, alerts, and market data
- Full offline mode with:
  - Local data persistence
  - Deferred syncing when connectivity is restored
  - Backup and restore options

---

## Deployment Guide

1. **Build the production app**
   ```bash
   npm run build
   ```

2. **Deploy to any hosting provider**
   - Netlify
   - Vercel
   - AWS S3 with CloudFront
   - Any static file server

3. **Environment Setup**
   - Ensure environment variables are correctly configured for production use

---

## Contributing

We welcome contributions from the community.

To contribute:
1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Add relevant tests if needed
5. Submit a pull request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

For questions, issues, or feedback:
- Email: support@cratemate.app
- Open an issue in this repository
- Refer to the documentation for additional help

---

## Roadmap

Planned features include:
- Mobile app (iOS/Android)
- Integration with IoT sensors
- Enhanced AI-based predictions
- Farmer marketplace features
- End-to-end supply chain tracking
- Weather data integration

---

Supporting small farmers with simple tech that reduces spoilage and improves earnings