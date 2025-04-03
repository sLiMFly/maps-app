import { View, ViewProps, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import MapView, { Polyline } from 'react-native-maps';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import FBA from '../FBA';

interface Props extends ViewProps {
    initialLocation: LatLng;
    showUserLocation?: boolean;
}


const CustomMap = ({
    initialLocation,
    showUserLocation = true,
    ...rest
}: Props) => {

    const mapRef = useRef<MapView>(null);

    const [isFollowingUser, setIsFollowingUser] = useState(true)
    const [isShowPolyline, setIsShowPolyline] = useState(true)

    const { watchLocation, clearWatchLocation, lastKnownLocation, getLocation, userLocationList } = useLocationStore();

    useEffect(() => {
        watchLocation();
        return () => {
            clearWatchLocation();
        }
    }, [])


    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation,])

    // useffect isShowPolyline



    const moveCameraToLocation = (latLng: LatLng) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: latLng,
            // zoom: 15,

        });
    }


    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveCameraToLocation(initialLocation);
        } else {
            moveCameraToLocation(lastKnownLocation);
        }
        const location = await getLocation();
        if (!location) return;

        moveCameraToLocation(location);
    }



    return (
        <View{...rest}>
            <MapView
                ref={mapRef}
                //showsPointsOfInterest={false}
                onTouchStart={() => setIsFollowingUser(false)}
                showsUserLocation={showUserLocation}
                style={styles.map}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                {
                    isShowPolyline &&
                    <Polyline
                        coordinates={userLocationList}
                        strokeColor={'red'}
                        strokeWidth={3}
                    />
                }



            </MapView>

            <FBA
                iconName={isShowPolyline ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowPolyline(!isShowPolyline)}
                style={{
                    bottom: 140,
                    right: 20,
                }}
            />

            <FBA
                iconName='compass-outline'
                onPress={() => moveToCurrentLocation()}
                style={{
                    bottom: 20,
                    right: 20,
                }}
            />

            <FBA
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom: 80,
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