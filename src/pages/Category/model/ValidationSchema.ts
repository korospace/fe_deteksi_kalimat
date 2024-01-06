import * as Yup from 'yup';

import { CategoryType } from './Types';

export const CategorySchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    description: Yup.string().required('description is required'),
});

export const CategoryDefaultValues: CategoryType = {
    id: 0,
    name: '',
    description: '',
};