/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    CONFIRM_USER_PINCODE,
    CONFIRM_USER_PINCODE_SUCCESS,
    CONFIRM_USER_PINCODE_FAILURE,
    LOGIN_SOCIAL_USER,
    LOGIN_SOCIAL_USER_SUCCESS,
    LOGIN_SOCIAL_USER_FAILURE,
    SEND_DELETE_PROFILE_LINK,
    SEND_DELETE_PROFILE_LINK_SUCCESS,
    SEND_DELETE_PROFILE_LINK_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    RESET_LOGIN,
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    CHANGE_MERGE_STATUS,
    CHECK_AUTH_STATUS,
    CHECK_AUTH_STATUS_SUCCESS
} from '../actions/types';

/**
 * Redux Action To Sigin User With Email, to generate Magic Link
 */
export const checkAuthStatus = () => ({
    type: CHECK_AUTH_STATUS
})
export const checkAuthStatusSuccess = (token) => ({
    type: CHECK_AUTH_STATUS_SUCCESS,
    payload: token
})

export const logoutUser = () => ({
    type: LOGOUT_USER
})
export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS
})
export const logoutUserFailure = () => ({
    type: LOGOUT_USER_FAILURE
})
export const authenticateUser = () => ({
    type: AUTHENTICATE_USER
});

// Successful authentication by user on server
export const authenticateUserSuccess = (response) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    payload: response
});

// Failure to authenticate user on server
export const authenticateUserFailure = (error) => ({
    type: AUTHENTICATE_USER_FAILURE,
    payload: error
});

export const signin = (email) => ({
    type: LOGIN_USER,
    payload: { email, }
});

/**
 * Redux Action Signin Success
 */
export const signinUserSuccess = (email) => ({
    type: LOGIN_USER_SUCCESS,
    payload: email
});


/**
 * Redux Action Signin Failure
 */
export const signinUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error
})

/**
 * Redux Action Social Signin 
 */

export const socialSignIn = (socialResponse) => ({
    type: LOGIN_SOCIAL_USER,
    payload: socialResponse
});

/**
 * Redux Action Social Signin Success
 */
export const socialSigninUserSuccess = (userInfo) => ({
    type: LOGIN_SOCIAL_USER_SUCCESS,
    payload: userInfo
});


/**
 * Redux Action Social Signin Failure
 */
export const socialSigninUserFailure = (error) => ({
    type: LOGIN_SOCIAL_USER_FAILURE,
    payload: error
})

// Send Delete User Profile link Action
export const sendDeleteUserLink = () => ({
    type: SEND_DELETE_PROFILE_LINK,
});

// Send Delete User Profile link success Action
export const sendDeleteUserLinkSuccess = () => ({
    type: SEND_DELETE_PROFILE_LINK_SUCCESS,
});

// Send Delete User Profile link failure Action
export const sendDeleteUserLinkFailure = () => ({
    type: SEND_DELETE_PROFILE_LINK_FAILURE,
});

// Delete User Profile Action
export const deleteUser = (user) => ({
    type: DELETE_USER,
    payload: user
});

/**
 * Redux Action Delete User Success
 */
export const deleteUserSuccess = (userInfo) => ({
    type: DELETE_USER_SUCCESS,
    payload: userInfo
});


/**
 * Redux Action Delete User Failure
 */
export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    payload: error
})


/**
 * Redux Action To get the JWT Token after entering pincode received in the magic link email.
 */
export const confirmUserWithPincode = (token) => ({
    type: CONFIRM_USER_PINCODE,
    payload: token
});

/**
 * Redux Action JWTToken Success
 */
export const confirmUserWithPincodeSuccess = (token) => ({
    type: CONFIRM_USER_PINCODE_SUCCESS,
    payload: token
});


/**
 * Redux Action JWTToken Failure
 */
export const confirmUserWithPincodeFailure = (error) => ({
    type: CONFIRM_USER_PINCODE_FAILURE,
    payload: error
})

export const resetLogin = () => ({
    type: RESET_LOGIN,
});

export const logOff = () => ({
    type: LOGOUT_USER
});

export const logOffSuccess = (response) => ({
    type: LOGOUT_USER_SUCCESS,
    payload: response
});

// Failure to log off user from gravito
export const logOffFailure = (error) => ({
    type: LOGOUT_USER_FAILURE,
    payload: error
});

export const changeMergeStatus = (value) => ({
    type: CHANGE_MERGE_STATUS,
    payload: value
})
