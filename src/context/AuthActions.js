export const LoginStart = (userCredential) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload:error
})

export const Follow = (userId) => ({
    type: "Follow",
    payload: userId,
})

export const Unfollow = (userId) => ({
    type: "Unfollow",
    payload: userId,
})

