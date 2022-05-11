import axios, { SERVER_ADDRESS } from "./axios";
const API_DASHBOARD = {
    getSystemInformation:   "api/mini-vendor/admin/dashboard/system",
    getSentChart:           "api/mini-vendor/admin/dashboard/sent",
    getReceiveChart:        "api/mini-vendor/admin/dashboard/receive",
    
}
const API_PAYMENT = {
    getEbarimt:         "api/mini-vendor/payment/ebarimt",
}
const API_ADMIN = {
    admins:             "api/mini-vendor/admin/admin-management",
    addMiniVendor:      "api/mini-vendor/admin/vendor/add",
    deleteMiniVendor:   "api/mini-vendor/admin/vendor/delete",
    editMiniVendor:     "api/mini-vendor/admin/vendor/edit",
    changeVendorOwner:     "api/mini-vendor/admin/vendor/set-owner",
    getMiniVendors:     "api/mini-vendor/admin/vendor/list",
    addProduct:         "api/mini-vendor/admin/product/add",
    editProduct:        "api/mini-vendor/admin/product/edit",
    getProducts:        "api/mini-vendor/admin/products/list/",
    deleteProduct:      "api/mini-vendor/admin/product/delete",
    users:                  "api/mini-vendor/admin/user-management",
    removeUser:             "api/mini-vendor/admin/user/remove",
    changeUserStatus:        "api/mini-vendor/admin/user/change-active",

}
const API_CLIENT = {
    getMiniVendor:      "api/mini-vendor/vendor/",
    getProducts:        "api/mini-vendor/product/list/",
    buyProduct:         "api/mini-vendor/product/buy",
    getPayHistory:      "api/mini-vendor/payment/history/",
    takeProduct:        "api/mini-vendor/product/take",
}
const API_AUTH = {
    login: "api/mini-vendor/auth/login",
    register: "api/mini-vendor/auth/register",
    verifyPassword: "api/mini-vendor/auth/verify-password",
    verifyOTP: "api/mini-vendor/auth/verify-otp",
    setProfileWithImage: "api/mini-vendor/auth/set-profile-with-image",
    setProfileWithoutImage: "api/mini-vendor/auth/set-profile-without-image",
    changePassword: "api/mini-vendor/auth/change-password",
}
const API_BILLING = {
    saveBillingInfo :'api/mini-vendor/auth/set-billing'
}
const ASSETS_URL = {
    root: SERVER_ADDRESS,
    image: `${SERVER_ADDRESS}uploads/images/`
}
const SEND_PUT_REQUEST = async(url, data) => {
    const response = await axios.put(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
}
const SEND_POST_REQUEST_WITH_FORM_DATA = async(url, data) => {
    const response = await axios.post(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
}
const SEND_DELETE_REQUEST = async(url, id, callback) => {
    const response = await axios.delete(`${url}/${id}`);
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
}
const SEND_POST_REQUEST = async(url, data, callbak) => { 
    const response = await axios.post(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
    // });


}
const SEND_GET_REQUEST = async(url, data) => {
    const response = await axios.get(url, data);
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        return [];
    }
}
export {
    SEND_DELETE_REQUEST,
    SEND_POST_REQUEST,
    SEND_GET_REQUEST,
    SEND_PUT_REQUEST,
    SEND_POST_REQUEST_WITH_FORM_DATA,
    ASSETS_URL, 
    API_AUTH,
    API_ADMIN,
    API_CLIENT,
    API_BILLING,
    API_DASHBOARD,
    API_PAYMENT
};