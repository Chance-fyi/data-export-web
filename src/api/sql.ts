import {GetRequest, PostRequest} from "../../utils/util";

export const sqlList = (params: object) => {
  return GetRequest("/api/sql/list", params)
}

export const createSql = (data: object) => {
  return PostRequest("/api/sql/create", data)
}

export const GetSql = (id: bigint) => {
  return GetRequest("/api/sql/get", {id})
}

export const editSql = (data: object) => {
  return PostRequest("/api/sql/edit", data)
}

export const getUserSql = (id: bigint) => {
  return GetRequest("/api/sql/getUser", {id})
}

export const setUserSql = (data: object) => {
  return PostRequest("/api/sql/setUser", data)
}

export const mySqlList = (params: object) => {
  return GetRequest("/api/sql/myList", params)
}

export const getUserSqlName = (id: bigint) => {
  return GetRequest("/api/sql/getUserSqlName", {id})
}

export const setUserSqlName = (data: object) => {
  return PostRequest("/api/sql/setUserSqlName", data)
}
