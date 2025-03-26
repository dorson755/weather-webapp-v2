export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city || typeof city !== "string" || city.trim().length === 0) {
    return Response.json({ error: "Please provide a valid city name" }, { status: 400 });
  }

  const encodedCity = encodeURIComponent(city.trim());

  try {
    const response = await fetch(
      `https://your-api-url.com/integrations/weather-by-city/weather/${encodedCity}`
    );

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch weather data" }, { status: response.status });
    }

    const data = await response.json();

    if (!data.current || !data.location) {
      return Response.json({ error: "Invalid weather data received" }, { status: 500 });
    }

    return Response.json({
      temperature: parseFloat(data.current.temp_c),
      condition: data.current.condition?.text || "Unknown",
      location: `${data.location.name}, ${data.location.country}`,
      humidity: data.current.humidity,
      wind: data.current.wind_kph,
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch weather data. Please try again later." }, { status: 500 });
  }
}
