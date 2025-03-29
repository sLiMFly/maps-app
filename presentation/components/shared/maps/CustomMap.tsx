import { View, ViewProps, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import MapView from 'react-native-maps';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import FBA from '../FBA';

interface Props extends ViewProps {
    initialLocation: LatLng;
    showUserLocation?: boolean;
}


const CustomMap = ({ initialLocation, showUserLocation = true, ...rest }: Props) => {

    const mapRef = useRef<MapView>(null);
    const { watchLocation, clearWatchLocation, lastKnownLocation } = useLocationStore();

    useEffect(() => {
        watchLocation();
        return () => {
            clearWatchLocation();
        }
    }, [])


    useEffect(() => {
        if (!lastKnownLocation) return;
        moveCameraToLocation(initialLocation);
    }, [lastKnownLocation])




    const moveCameraToLocation = (latLng: LatLng) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: latLng,
            // zoom: 15,

        });
    }



    return (
        <View{...rest}>
            <MapView
                ref={mapRef}
                //showsPointsOfInterest={false}
                showsUserLocation={showUserLocation}
                style={styles.map}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />


            <FBA
                iconName="airplane-outline"
                onPress={() => { }}
                style={{
                    bottom: 20,
                    right: 20,
                }}
            />


        </View>
    )
}


const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
        //backgroundColor: "red"
    }
});



export default CustomMap