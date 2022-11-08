import {GetRequest, PostRequest} from "../../utils/util";

export const databaseList = (params: object) => {
  return GetRequest("/api/database/list", params)
}

export const createDatabase = (data: object) => {
  return PostRequest("/api/database/create", data)
}

export const getDatabase = (id: bigint) => {
  return GetRequest("/api/database/get", {id})
}

export const editDatabase = (data: object) => {
  return PostRequest("/api/database/edit", data)
}

export const databaseSelectList = () => {
  return GetRequest("/api/database/selectList")
}
