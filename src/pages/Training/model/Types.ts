export type TrainingSingleIType = {
  raw_text: string
}

export type TrainingMultiType = {
  file_bulktraining: any[]
}

export type ConfusionMatrixType = {
  FN: number,
  FP: number,
  TN: number,
  TP: number
}

export type ResultSingleType = {
  best_category: string,
  best_score: number,
  bobot: any
}

export type ResultMultiType = {
  confusion_matrix: ConfusionMatrixType,
  accuracy: number
  predictions: any[]
}