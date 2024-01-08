import { TrainingMultiType, TrainingSingleIType } from "./Types"
import * as Yup from 'yup';

export const TrainingSingleSchema = Yup.object().shape({
    raw_text: Yup.string().required('text is required'),
});

export const TrainingSingleDefaultValues: TrainingSingleIType = {
  raw_text: ''
}

export const TrainingMultiSchema = Yup.object().shape({
  file_bulktraining: Yup.array().required('text is required'),
});

export const TrainingMultiDefaultValues: TrainingMultiType = {
  file_bulktraining: [],
}
