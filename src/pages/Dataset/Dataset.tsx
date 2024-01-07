import { Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

/* Components */
import DatasetForm from "./components/DatasetForm";
import DatasetImportForm from "./components/DatasetImportForm";
import DatasetList from "./components/DatasetList";
/* Types */
import { DatasetType } from "./model/Types";
/* Functions */
import { GetDatasetList } from "./model/Functions";

const Dataset = () => {
    const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
    const [showFormImport, setShowFormImport] = useState<boolean>(false);
    const [datasetList, setDatasetList] = useState<DatasetType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const openCreate = () => {
        setShowFormCreate(true)
        setShowFormImport(false)
    }

    const openImport = () => {
        setShowFormCreate(false)
        setShowFormImport(true)
    }

    /* get list */
    const fetchData = async () => {
        setIsLoading(true)
        const data = await GetDatasetList();
        setDatasetList(data)
        setIsLoading(false)
    };

    useEffect(() => {
        fetchData();
    },[])

    /* After Update */
    const handleUpdate = (dataNew: DatasetType): void => {
        datasetList.map((e) => {
            if (e.id == dataNew.id) {
                e.raw = dataNew.raw
                e.clean = dataNew.clean
                e.stemming = dataNew.stemming
                e.stopword = dataNew.stopword
                e.tokenization = dataNew.tokenization
                e.category = dataNew.category
            }
        })

        setDatasetList([])
        setDatasetList((prevData) => [...prevData, ...datasetList]);
    }

    /* After Delete */
    const handleDelete = (data: DatasetType): void => {
        const newCategoryList = datasetList.filter((e) => {
            if (e.id != data.id) {
                return e
            }
        })

        setDatasetList([])
        setDatasetList((prevData) => [...prevData, ...newCategoryList]);
    }

    return (
        <Box>
            {/* button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '38px', gap: 2 }}>
                <Button variant="outlined" color="info" onClick={() => openCreate()}>
                    <Icon icon="typcn:plus" fontSize='18px' />
                    <Box sx={{ display: 'inline', marginLeft: '12px' }}>Create</Box>
                </Button>
                <Button variant="outlined" color="warning" onClick={() => openImport()}>
                    <Icon icon="material-symbols:upload" fontSize='18px' />
                    <Box sx={{ display: 'inline', marginLeft: '12px' }}>Import</Box>
                </Button>
            </Box>

            {/* table */}
            <Table size='small' aria-label="simple table">
                
                <colgroup>
                    <col width="100" />
                    <col width="*" />
                    <col width="*" />
                    <col width="*" />
                    <col width="*" />
                    <col width="*" />
                    <col width="*" />
                    <col width="200" />
                </colgroup>

                <TableHead>
                    <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="left">Raw</TableCell>
                        <TableCell align="left">Clean</TableCell>
                        <TableCell align="left">Stemming</TableCell>
                        <TableCell align="left">Stopword</TableCell>
                        <TableCell align="left">Tokenization</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* Create New */}
                    <TableRow> 
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                            <Collapse in={showFormCreate===true} timeout="auto" unmountOnExit>
                                <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
                                    <DatasetForm
                                        handleCancleProp={() => {setShowFormCreate(false)}} 
                                        handleCreateProp={() => {fetchData();}} 
                                    />
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>

                    {/* Import */}
                    <TableRow> 
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                            <Collapse in={showFormImport===true} timeout="auto" unmountOnExit>
                                <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
                                    <DatasetImportForm
                                        handleCancleProp={() => {setShowFormImport(false)}} 
                                        handleImportProp={() => {fetchData();}} 
                                    />
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>

                    {/* List */}
                    {datasetList.map((data: DatasetType, index) => {
                        return (
                            <DatasetList
                                key={index}
                                data={data}
                                counter={index + 1}
                                handleDeleteProp={(data) => handleDelete(data)}
                                handleUpdateProp={(dataNew) => handleUpdate(dataNew)}
                            />
                        );
                    })}
                </TableBody>
            </Table>

            {/* loading */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px', opacity: isLoading === false ? '0' : '1' }}>
                {'loading ...'}
            </Box>
        </Box>
    )
}

export default Dataset;
