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
