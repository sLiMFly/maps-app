import { PermissionStatus } from "@/infrastructure/interfaces/location";
import * as Location from "expo-location";

export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        manualPermisionRequest();
        return PermissionStatus.DENIED;
      }
      return PermissionStatus.GRANTED;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return PermissionStatus.UNAVAILABLE;
    }
  };

export const checkLocationPermission = async () => {
  switch (status) {
    case "granted":
      return PermissionStatus.GRANTED;
    case "denied":
      return PermissionStatus.DENIED;
    default:
      return PermissionStatus.UNDETERMINED;
  }
};

const manualPermisionRequest = async () => {
  // try {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status === "granted") {
  //     return true;
  //   }
  //   return false;
  // } catch (error) {
  //   console.error("Error requesting location permission:", error);
  //   return false;
  // }
};
