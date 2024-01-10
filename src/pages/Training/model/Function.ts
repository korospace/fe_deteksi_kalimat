import { enqueueSnackbar } from "notistack"
import axios from "../../../utils/axios"
import { ResultSingleType, TrainingSingleIType } from "./Types"

export const TrainSingle = async (params: TrainingSingleIType): Promise<ResultSingleType|null> => {
  try {
    const response = await axios.post("/penerjemah/run", params, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.data.data
  } catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: "warning" })
    } else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: "error" })
    }
    return null
  }
}
