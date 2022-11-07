import {GetRequest, PostRequest} from "../../utils/util";

export const createRole = (data: object) => {
  return PostRequest("/api/role/create", data)
}

export const roleList = (params: object) => {
  return GetRequest("/api/role/list", params)
}

export const getRole = (id: bigint) => {
  return GetRequest("/api/role/get", {id})
}

export const editRole = (data: object) => {
  return PostRequest("/api/role/edit", data)
}

export const roleSelectList = () => {
  return GetRequest("/api/role/selectList")
}
