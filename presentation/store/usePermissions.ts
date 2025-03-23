import { create } from "zustand";
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import {
  checkLocationPermission,
  requestLocationPermission,
} from "@/core/actions/permissions/location";

interface PermissionsState {
  localtioStatus: PermissionStatus;

  requestLocationPermission: () => Promise<PermissionStatus>;

  checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissions = create<PermissionsState>()((set) => ({
  localtioStatus: PermissionStatus.CHEKING,
  requestLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({ localtioStatus: status });
    return status;
  },
  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    return status;
  },
}));
