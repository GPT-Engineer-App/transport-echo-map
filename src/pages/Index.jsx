import { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Index = () => {
  const [isochroneData, setIsochroneData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIsochrone = async () => {
    setLoading(true);
    setError(null);
    try {
      // This is a placeholder URL. Replace with actual API endpoint for Stockholm's public transport isochrones
      const response = await fetch('https://api.example.com/stockholm/isochrone');
      if (!response.ok) {
        throw new Error('Failed to fetch isochrone data');
      }
      const data = await response.json();
      setIsochroneData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Stockholm Public Transportation Isochrone Map</h1>
        <button
          onClick={fetchIsochrone}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate Isochrone'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="flex-grow">
        <MapContainer
          center={[59.3293, 18.0686]} // Stockholm coordinates
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {isochroneData && (
            <GeoJSON
              data={isochroneData}
              style={() => ({
                fillColor: 'blue',
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7,
              })}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Index;
