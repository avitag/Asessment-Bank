import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

type MapViewProps = {
  region: Region;
  latitude?: number;
  longitude?: number;
  title?: string;
};

const AppMapView: React.FC<MapViewProps> = ({ region, latitude, longitude, title }) => {
  return (
    <MapView style={styles.map} region={region}>
      {latitude && longitude && (
        <Marker
          coordinate={{ latitude, longitude }}
          title={title}
        />
      )}
    </MapView>
  );
};

export default AppMapView;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderRadius: 8,
  },
});
