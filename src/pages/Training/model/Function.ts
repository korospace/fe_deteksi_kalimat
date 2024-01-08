import { enqueueSnackbar } from "notistack"
import axios from "../../../utils/axios"
import { ResultMultiType, ResultSingleType, TrainingSingleIType } from "./Types"

export const TrainSingle = async (params: TrainingSingleIType): Promise<ResultSingleType|null> => {
  try {
    const formData = new FormData()
    formData.append("raw_text", params.raw_text)

    const response = await axios.post("/training/single", params, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    enqueueSnackbar("Dataset import successfully!", { variant: "success" })
    
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

export const TrainingMulti = async (params: any): Promise<ResultMultiType|null> => {
  try {
    const formData = new FormData()
    formData.append("file_bulktraining", params)

    const response = await axios.post("/training/bulk", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    enqueueSnackbar("Training import successfully!", { variant: "success" })
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
