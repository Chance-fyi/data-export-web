import {GetRequest, PostRequest} from "../../utils/util";

export const userList = (params: object) => {
  return GetRequest("/api/user/list", params)
}

export const createUser = (data: object) => {
  return PostRequest("/api/user/create", data)
}

export const getUser = (id: bigint) => {
  return GetRequest("/api/user/get", {id})
}

export const editUser = (data: object) => {
  return PostRequest("/api/user/edit", data)
}
