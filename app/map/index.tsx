import CustomMap from '@/presentation/components/shared/maps/CustomMap';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const MapScreen = () => {

  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }

  }, [])

  if (lastKnownLocation === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color="green" />
      </View>
    )
  }



  return (
    <View>

      <CustomMap
        initialLocation={
          lastKnownLocation
        }

      //style={{ height: '50%' }}
      />


    </View>
  );
};
export default MapScreen;