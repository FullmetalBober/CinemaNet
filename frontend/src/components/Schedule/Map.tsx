import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { CinemaState } from '../../contexts/CinemaProvider';
import Loading from '../UI/Loading';
import { useMemo } from 'react';

const Map = () => {
  const { cinema } = CinemaState();
  const center = useMemo<google.maps.LatLngLiteral>(() => {
    if (!cinema.location.coordinates) return { lat: 0, lng: 0 };
    return {
      lat: cinema.location.coordinates[1],
      lng: cinema.location.coordinates[0],
    };
  }, [cinema]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <Loading />;
  return (
    <GoogleMap
      zoom={15}
      center={center}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid'],
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        }
      }}
      mapContainerClassName="rounded-lg h-96 w-full"
    >
      <MarkerF position={center} title={'qwe'} />
    </GoogleMap>
  );
};

export default Map;
