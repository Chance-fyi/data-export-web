import {GetRequest, PostRequest} from "../../utils/util";

export const createMenu = (data: object) => {
  return PostRequest("/api/menu/create", data)
}

export const editMenu = (data: object) => {
  return PostRequest("/api/menu/edit", data)
}

export const GetMenu = (id: bigint) => {
  return GetRequest("/api/menu/get", {id})
}

export const menuList = (params: object) => {
  return GetRequest("/api/menu/list", params)
}

export const menuSelectTree = () => {
  return GetRequest("/api/menu/selectTree")
}
