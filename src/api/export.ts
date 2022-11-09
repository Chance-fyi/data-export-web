import {GetRequest, PostRequest} from "../../utils/util";

export const createExport = (data: object) => {
  return PostRequest("/api/export/create", data)
}

export const exportList = (params: object) => {
  return GetRequest("/api/export/list", params)
}
