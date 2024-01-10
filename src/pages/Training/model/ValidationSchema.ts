import { TrainingSingleIType } from "./Types"
import * as Yup from 'yup';

export const TrainingSingleSchema = Yup.object().shape({
    text: Yup.string().required('text is required'),
});

export const TrainingSingleDefaultValues: TrainingSingleIType = {
  text: ''
}
