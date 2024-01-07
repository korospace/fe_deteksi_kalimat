import { Box, Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

/* Components */
import UserForm from "./components/UserForm";
import { UserType } from "./model/Types";
import { GetUserList } from "./model/Functions";
import UserList from "./components/UserList";

const User = () => {
    const [showFormCreate, setShowFormCreate] = useState<boolean>(false);
    const [userList, setUserList] = useState<UserType[]>([]);

    /* get list */
    const fetchData = async () => {
        const data = await GetUserList();
        setUserList(data)
    };

    useEffect(() => {
        fetchData();
    },[])

    /* After Update */
    const handleUpdate = (dataNew: UserType): void => {
        userList.map((e) => {
            if (e.id == dataNew.id) {
                e.name = dataNew.name
                e.email = dataNew.email
                e.user_access_name = dataNew.user_access_name
            }
        })

        setUserList([])
        setUserList((prevData) => [...prevData, ...userList]);
    }

    /* After Delete */
    const handleDelete = (data: UserType): void => {
        const newCategoryList = userList.filter((e) => {
            if (e.id != data.id) {
                return e
            }
        })

        setUserList([])
        setUserList((prevData) => [...prevData, ...newCategoryList]);
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
                    <col width="*" />
                    <col width="*" />
                    <col width="200" />
                    <col width="200" />
                </colgroup>

                <TableHead>
                    <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">User Access</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* Create New */}
                    <TableRow> 
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                            <Collapse in={showFormCreate===true} timeout="auto" unmountOnExit>
                                <Box sx={{ paddingTop: 6, paddingBottom: 6 }}>
                                    <UserForm
                                        handleCancleProp={() => {setShowFormCreate(false)}} 
                                        handleCreateProp={() => {fetchData();}} 
                                    />
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>

                    {/* List */}
                    {userList.map((data: UserType, index) => {
                        return (
                            <UserList
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

export default User;
