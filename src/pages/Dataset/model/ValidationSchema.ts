import * as Yup from 'yup';

import { DatasetImportType, DatasetType } from './Types';

export const DatasetSchema = Yup.object().shape({
    raw: Yup.string().required('raw is required'),
    clean: Yup.string().required('clean is required'),
    stopword: Yup.string().required('stopword is required'),
    stemming: Yup.string().required('stemming is required'),
    tokenization: Yup.string().required('tokenization is required'),
    category: Yup.string().required('category is required'),
});

export const DatasetDefaultValues: DatasetType = {
    id: 0,
    raw: '',
    clean: '',
    stopword: '',
    stemming: '',
    tokenization: '', 
    category: ''
};

export const DatasetImportSchema = Yup.object().shape({
    file_dataset: Yup.object().required()
});

export const DatasetImportDefaultValues: DatasetImportType = {
    file_dataset: {},
};