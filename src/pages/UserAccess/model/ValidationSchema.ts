import * as Yup from 'yup';

import { UserAccessType } from './Types';

export const UserAccessSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    description: Yup.string().required('description is required'),
});

export const UserAccessDefaultValues: UserAccessType = {
    id: 0,
    name: '',
    description: '',
};