import Logo from "../assets/mankavith-login-logo.svg"

export const razorPayKeys = {
    // key_id: 'rzp_test_YW49ucyVtjePLT',//development
    key_id: import.meta.env.VITE_APP_RAZORPAY_KEY_ID, //production
    // key_secret: 'FFn6tCkoKKQxfdvPCFuiijRE', //development
    key_secret: import.meta.env.VITE_APP_RAZORPAY_KEY_SECRET,//production
    name: 'Mankavit',
    logo: Logo
}