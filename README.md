# Weather App

A modern, responsive weather application built with Next.js and TypeScript that provides real-time weather information and forecasts. Features a clean, intuitive interface with support for both light and dark themes.

## Features

- 🌤️ Real-time weather data
- 📱 Fully responsive design
- 🌓 Light/Dark theme support
- 🔍 City search functionality
- 📊 4-day weather forecast
- 🎨 Beautiful UI with weather animations
- 🌍 Location-based weather updates

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- A WeatherAPI.com account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your WeatherAPI key:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository.

2. Import your project into Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add your environment variables (NEXT_PUBLIC_WEATHER_API_KEY)
   - Click "Deploy"

3. Vercel will automatically detect Next.js and deploy your application.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [WeatherAPI.com](https://www.weatherapi.com/) - Weather data
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [Weather Icons](https://github.com/erikflowers/weather-icons)