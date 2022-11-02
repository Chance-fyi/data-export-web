import {GetRequest, PostRequest} from "../../utils/util";

export const login = (data: API.LoginRequest) => {
  return PostRequest("/api/login", data)
}

export const logout = () => {
  localStorage.removeItem('token')
  return GetRequest("/api/logout")
}

export const refreshToken = () => {
  return PostRequest("/api/refreshToken", {
    token: localStorage.getItem('token')
  })
}

export const getUserInfo = () => {
  return GetRequest("/api/getUserInfo")
}
