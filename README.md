# Weatherly: A Modern Weather Application

A sleek, responsive weather application built with Next.js and TypeScript. It provides real-time weather information, detailed forecasts, and a beautiful, intuitive interface with light and dark themes.

## Features

- 🌤️ **Real-time Weather Data:** Get up-to-the-minute weather information for any city.
- 📊 **7-Day Forecast:** Plan ahead with a detailed 7-day weather forecast.
- 📍 **City Search:** Find weather information for any location and have your last search saved for convenience.
- **Today's Highlights:** A comprehensive overview of the day's weather, including:
  - **UV Index:** With a helpful gauge to show the intensity.
  - **Wind Status:** Current wind speed and direction.
  - **Sunrise & Sunset:** Times for the local area.
  - **Humidity:** Percentage of humidity.
  - **Visibility:** Air visibility in miles/kilometers.
  - **Feels Like:** The perceived temperature.
- 🗺️ **Interactive Map:** Visualize the weather with an interactive map of the selected location.
- 🌓 **Light/Dark Theme:** Switch between light and dark modes for comfortable viewing.
- 📱 **Fully Responsive Design:** A seamless experience across all devices.
- 🎨 **Weather Animations:** Subtle rain and snow animations for an immersive experience.

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- A WeatherAPI.com account (free tier available)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hith3sh/Weatherly.git
cd Weatherly
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
- [Leaflet](https://leafletjs.com/) - Interactive maps

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
- Icons used are from various sources, bundled with the project.
