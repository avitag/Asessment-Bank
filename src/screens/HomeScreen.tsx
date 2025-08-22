import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import PlaceSearch from '../components/PlaceSearch';
import { useAppSelector } from '../hooks/reduxHooks';
import palette from '../theme/palette';

const { width, height } = Dimensions.get('window');

const DEFAULT_REGION: Region = {
  latitude: 3.1390,
  longitude: 101.6869,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const HomeScreen: React.FC = () => {
  const selectedPlace = useAppSelector((state) => state.search.selectedPlace);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);

  useEffect(() => {
    if (selectedPlace?.lat && selectedPlace?.lng) {
      setRegion({
        latitude: selectedPlace.lat,
        longitude: selectedPlace.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [selectedPlace]);

  return (
    <View style={styles.container}>
      <PlaceSearch />

      <MapView style={styles.map} region={region}>
        {selectedPlace?.lat && selectedPlace?.lng && (
          <Marker
            coordinate={{ latitude: selectedPlace.lat, longitude: selectedPlace.lng }}
            title={selectedPlace.description}
            pinColor={palette.primary}
          />
        )}
      </MapView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.background },
  map: { flex: 1, width, height },
});
