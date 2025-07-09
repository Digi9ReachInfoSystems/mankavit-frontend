import { verifyUser } from "../api/userApi";
import { getCookiesData } from "./cookiesService";



export const getAuth = async () => {
    const cookiesData = await getCookiesData();
    const { userId } = cookiesData;
    const response = await verifyUser({ userId });

    if (!response.data.success) {
        return { isAuthenticated: false, userId: null, role: null , isSuperAdmin: false};

    } else {
          console.log("response routes", response.data);
        return { isAuthenticated: true, userId, role: response.data.role, isSuperAdmin: response.data.isSuperAdmin,Permissions: response.data.permissions };
    }

};