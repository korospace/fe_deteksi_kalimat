import axios from "../../../utils/axios"
import { trainingSingleIForm } from "./Types"

export const trainSingle = async (params: trainingSingleIForm) => {
  const response = await axios.post("/training/single")

  return response.data
}
