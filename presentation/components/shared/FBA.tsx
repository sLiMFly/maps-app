import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {

    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>

}

const FBA = ({ onPress, style, iconName }: Props) => {
    return (
        <View style={[styles.btn, style]}>
            <TouchableOpacity
                onPress={onPress}>
                <Ionicons name={iconName} size={30} color="white" />


            </TouchableOpacity>


        </View>
    )
}

export default FBA;

const styles = StyleSheet.create({
    btn: {
        zIndex: 90,
        position: "absolute",
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5,
        },
        elevation: 5,



    }
})