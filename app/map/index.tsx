import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>

      <MapView
        //showsPointsOfInterest={false}
        style={styles.map}
        //36.388725, -6.208053 santi petri
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 36.388725,
          longitude: -6.208053,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

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

