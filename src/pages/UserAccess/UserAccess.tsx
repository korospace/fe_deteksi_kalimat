import { Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

/* Components */
import CategoryForm from "./components/UserAccessForm";
import { UserAccessType } from "./model/Types";
import { GetUserAccessList } from "./model/Functions";
import CategoryList from "./components/UserAccessList";

const UserAccess = () => {
    const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<UserAccessType[]>([]);

    /* get list */
    const fetchData = async () => {
        const data = await GetUserAccessList();
        setCategoryList(data)
    };

    useEffect(() => {
        fetchData();
    },[])

    /* After Update */
    const handleUpdate = (dataNew: UserAccessType): void => {
        categoryList.map((e) => {
            if (e.id == dataNew.id) {
                e.name = dataNew.name
                e.description = dataNew.description
            }
        })

        setCategoryList([])
        setCategoryList((prevData) => [...prevData, ...categoryList]);
    }

    /* After Delete */
    const handleDelete = (data: UserAccessType): void => {
        const newCategoryList = categoryList.filter((e) => {
            if (e.id != data.id) {
                return e
            }
        })

        setCategoryList([])
        setCategoryList((prevData) => [...prevData, ...newCategoryList]);
    }

    return (
        <Box>
            {/* button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '38px' }}>
                <Button variant="outlined" color="info" onClick={() => setShowFormCreate(true)}>
                    <Icon icon="typcn:plus" fontSize='18px' />
                    <Box sx={{ display: 'inline', marginLeft: '12px' }}>Create</Box>
                </Button>
            </Box>

            {/* table */}
            <Table size='small' aria-label="simple table">
                
                <colgroup>
                    <col width="100" />
                    <col width="250" />
                    <col width="*" />
                    <col width="200" />
                </colgroup>

                <TableHead>
                    <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* Create New */}
                    <TableRow> 
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                            <Collapse in={showFormCreate===true} timeout="auto" unmountOnExit>
                                <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
                                    <CategoryForm
                                        handleCancleProp={() => {setShowFormCreate(false)}} 
                                        handleCreateProp={() => {fetchData();}} 
                                    />
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>

                    {/* List */}
                    {categoryList.map((data: UserAccessType, index) => {
                        return (
                            <CategoryList
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
        </Box>
    )
}

export default UserAccess;
