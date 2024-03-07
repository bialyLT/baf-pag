import { getUserAdmin } from "../services/apiAdmin"

export const getAdminUserHelper = (data) => {
  try {
    if (data) {
      const dataRes = getUserAdmin(data)
      return dataRes
    }
  } catch (e) {
    throw e
  }
}