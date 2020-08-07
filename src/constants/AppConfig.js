/**
 * App Config File
 *
 */
// appUrl: 'https://dev-pwa.gravito.net', // App Url
//     adminUrl:'https://admin.gravito.net',
//     appLocalUrl:'/assets/data/',
//     cookieDomain:'gravito.net', // 'https://*.gravito.net'
//     cookieSecure:true,
//     brandName: 'Gravito', // Brand Name  
//     apiPath: 'https://api.gravito.net/api', // Gravito API Path
//     facebookAppId:'1946801098918823',
//     googleClientId:'161046543811-vchpbkuq32oh2vigslkln3n1271bplov.apps.googleusercontent.com',
// var locale = JSON.parse(localStorage.getItem('locale')) ? JSON.parse(localStorage.getItem('locale')) : {
//   languageId: 'english',
//   locale: 'en_US',
//   name: 'English',
//   icon: 'en',
//   momentId:'en'
// }

const AppConfig = {
    // appLogo: require('../assets/img/gravito_logo.png'),          // App Logo
     appUrl: 'http://localhost:3000', // App Url
    adminUrl:'http://localhost:3100',
    appLocalUrl:'/assets/data/',
    cookieDomain:'https://*.gravito.net', // 'https://*.gravito.net'
    cookieSecure:true,
    brandName: 'Gravito', // Brand Name  
    apiPath: 'https://dev-account.gravito.net/api', // Gravito API Path
    facebookAppId:'1946801098918823',
    googleClientId:'161046543811-vchpbkuq32oh2vigslkln3n1271bplov.apps.googleusercontent.com',
    navCollapsed: false,                                      // Sidebar collapse
    darkMode: false,                                          // Dark Mode
    boxLayout: false,                                         // Box Layout
    rtlLayout: false,                                         // RTL Layout
    miniSidebar: false,                                       // Mini Sidebar
    enableSidebarBackgroundImage: true,                      // Enable Sidebar Background Image
    // sidebarImage: require('../assets/img/sidebar-4.jpg'),     // Select sidebar image
    isDarkSidenav: true,                                   // Set true to dark sidebar
    enableThemeOptions: true,                              // Enable Theme Options
    // locale:locale,
    enableUserTour: process.env.NODE_ENV === 'production' ? true : false,  // Enable / Disable User Tour
    copyRightText: 'Copyright © Gravito Ltd 2019',      // Copy Right Text
    // light theme colors
    themeColors: {
      'primary': '#FFA100',
      'secondary': '#606060',
      'info': '#C9C9C9',
      'success': '#919191',
      'warning': '#D5573B',
      'danger': '#CF1322',

    'default': '#657786',
    'purple': '#6f42c1',

    'yellow': '#D46B08',
    'white': '#FFFFFF',
    'dark': '#000000',
    'greyLighten': '#DFE3E8',
    'grey': '#9FA5AB'
  },
  // dark theme colors
  darkThemeColors: {
    darkBgColor: '#424242'
  },
  countries: [
    {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
    },
    {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
    },
    {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
    },
    {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
    },
    {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
    },
    {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
    },
    {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
    },
    {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
    },
    {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
    },

    {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
    },
    {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
    },

    {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
    },
    {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
    },
    {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
    },
    {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
    },
    {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
    },
    {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
    },
    {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
    },
    {
      "name": "Finland",
      "dial_code": "+358",
      "code": "fi"
    },
    {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
    },
    {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
    },
    {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
    },
    {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
    },
    {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
    },
    {
      "name": "Iran, Islamic Republic of Persian Gulf",
      "dial_code": "+98",
      "code": "IR"
    },
    {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
    },
    {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
    },
    {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
    },
    {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
    },
    {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KN"
    },
    {
      "name": "Korea, Democratic People's Republic of Korea",
      "dial_code": "+850",
      "code": "KP"
    },
    {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
    },
    {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
    },
    {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
    },
    {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
    },
    {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
    },
    {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
    },
    {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
    },
    {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
    },
    {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
    },
    {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
    },
    {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
    },
    {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
    },
    {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
    },
    {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
    },
    {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
    },
    {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
    },
    {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
    },
    {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
    },
    {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
    },
    {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
    },
    {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
    },
    {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
    },
    {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
    },
    {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
    },
  ]
}

export default AppConfig;
