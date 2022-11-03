import {GetRequest, PostRequest} from "../../utils/util";

export const createMenu = (data: object) => {
  return PostRequest("/api/menu/create", data)
}

export const menuList = (params: object) => {
  return GetRequest("/api/menu/list", params)
}

export const menuSelectTree = () => {
  return GetRequest("/api/menu/selectTree")
}
