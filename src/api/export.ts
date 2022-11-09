import {PostRequest} from "../../utils/util";

export const createExport = (data: object) => {
  return PostRequest("/api/export/create", data)
}
