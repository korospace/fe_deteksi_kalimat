import * as Yup from 'yup';

import { UserType } from './Types';

export const UserSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    email: Yup.string().required('email is required'),
    user_access_id: Yup.number().required('user access is required'),
});

export const UserDefaultValues: UserType = {
    id: 0,
    name: '',
    email: '',
    password: '',
    user_access_id: 0,
};