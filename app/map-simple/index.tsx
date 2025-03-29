import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>

      <MapView
        //showsPointsOfInterest={false}
        style={styles.map}
        //25.790749, -80.127265 miami beach
        //provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 25.790749,
          longitude: 80.127265,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

        <Marker
          coordinate={{
            latitude: 25.790749,
            longitude: -80.127265,
          }}
          title="Miami Beach"
          description="Miami Beach is a coastal resort city in Miami-Dade County, Florida, United States."
        />

        <Marker
          coordinate={{
            latitude: 25.964729,
            longitude: -80.118506,
          }}
          title="Golden Beach"
          description="Golden Beach is a town in Miami-Dade County, Florida, United States."
        />

      </MapView>

    </View>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    //backgroundColor: "red"
  }
});

