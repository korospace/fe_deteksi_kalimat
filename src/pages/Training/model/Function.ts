import { enqueueSnackbar } from "notistack"
import axios from "../../../utils/axios"
import { TrainingSingleIForm } from "./Types"

export const TrainSingle = async (params: TrainingSingleIForm) => {
  try {
    const formData = new FormData()
    formData.append("raw_text", params.raw_text)

    const response = await axios.post("/training/single", params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    enqueueSnackbar("Dataset import successfully!", { variant: "success" })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: "warning" })
    } else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: "error" })
    }
    return null
  }
}

export const ImportTraining = async (params: any) => {
  try {
    const formData = new FormData()
    formData.append("file_bulktraining", params)

    await axios.post("/training/bulk", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    enqueueSnackbar("Training import successfully!", { variant: "success" })
    return true
  } catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: "warning" })
    } else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: "error" })
    }
    return false
  }
}
