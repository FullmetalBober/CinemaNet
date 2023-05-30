import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import Loading from './Loading';
import { useMemo } from 'react';

interface IProps {
  center?: google.maps.LatLngLiteral;
  marker?: boolean;
  markerPosition?: google.maps.LatLngLiteral;
  zoom?: number;
  handleMapClick?: (e: google.maps.MapMouseEvent) => void;
}

const Map = (props: IProps) => {
  const center = useMemo<google.maps.LatLngLiteral>(() => {
    if (!props.center) return { lat: 0, lng: 0 };
    return props.center;
  }, [props.center]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <Loading />;
  return (
    <GoogleMap
      zoom={props.zoom}
      center={center}
      onClick={props.handleMapClick}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'hybrid'],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        },
      }}
      mapContainerClassName='h-96 w-full'
    >
      {props.marker && <MarkerF position={props.markerPosition || center} />}
    </GoogleMap>
  );
};

export default Map;
