import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from './icon-location.svg';

const ChangeView = ({center, zoom}) => {
    const map = useMap();
    map.setView(center, zoom);
    return null
};

const Map = (props) => {

    const { latitude, longitude } = props;
    const position = [latitude, longitude];

    const markerIconL = L.icon({
        iconUrl: markerIcon
    });

    return (
        <MapContainer center={position} zoom={13} dragging={false} zoomControl={false} scrollWheelZoom={false} id='map' style={{ zIndex: "-5" }} >
            <ChangeView center={position} zoom={13} />
            <TileLayer 
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={position} icon={markerIconL} />
        </MapContainer>
    )
};

export default Map;