# MarketPulseAI Frontend

A Next.js-based frontend application for real-time market analysis and stock recommendations.

## 🚀 Features

- Real-time market data visualization
- Stock recommendations and analysis
- Performance tracking
- Interactive charts and tables
- Responsive design
- User authentication and profile management

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: ApexCharts
- **UI Components**: shadcn/ui
- **Authentication**: JWT-based


## 🚦 Getting Started

1. **Clone the repository**

cd marketpulseai


2. **Install dependencies**

npm install
or
yarn install


3. **Set up environment variables**

Create a `.env.local` file in the root directory:
env
NEXT_PUBLIC_MARKET_API_URL=your_api_url


4. **Run the development server**

bash
npm run dev
or
yarn dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔧 Configuration

- **Tailwind**: Customization in `tailwind.config.ts`
- **TypeScript**: Configuration in `tsconfig.json`
- **Components**: UI component settings in `components.json`

## 📚 Key Components

- **MarketSummary**: Real-time market data ticker
- **Overview**: Market analysis and summaries
- **Recommendations**: Stock recommendations display
- **Performance**: Historical performance tracking
- **Charts**: Interactive candlestick charts

## 🔐 Authentication

The application uses JWT-based authentication with tokens stored in cookies. Protected routes are handled through middleware.

## 🎨 Styling

- Custom theme configuration using Tailwind CSS
- Responsive design principles
- Dark mode support
- Custom animations and transitions

## 📦 State Management

Zustand is used for state management with separate stores for:
- Market data
- Recommendations
- User preferences
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

