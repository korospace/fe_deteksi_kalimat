import { Fragment, useEffect, useState } from "react";
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Icon } from '@iconify/react';

/* Types */
import { ResultMultiType } from "../model/Types";
import { CategoryType } from "../../Category/model/Types";
/* Components */
import { StyledTableRow, StyledTableRowHead } from "./StyledComponents";

/* Props */
type Props = {
    dataProp?: ResultMultiType,
    optCategoryProp: CategoryType[]
};

const TrainingMultiResult = (props: Props) => {
    /* Data  */
    const [dataResult, setDataResult] = useState<ResultMultiType>()

    useEffect(() => {
        setDataResult(dataResult)
    }, [dataResult, props])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        True Positife
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.confusion_matrix.TP}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        True Negative
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.confusion_matrix.TN}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        False Positive
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.confusion_matrix.FP}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        False Negative
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.confusion_matrix.FN}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Akurasi
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.accuracy}
                    </Typography>
                </Grid>
            </Grid>

            <Table size='small' aria-label="simple table" sx={{ marginTop: '36px' }}>
                <colgroup>
                    <col width="100" />
                    <col width="*" />
                    <col width="200" />
                    <col width="200" />
                </colgroup>

                <TableHead>
                    <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="left">Text</TableCell>
                        <TableCell align="center">Expected</TableCell>
                        <TableCell align="center">Predicted</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.dataProp?.predictions.map((prediction: any, key: number) => (
                        <Fragment key={key}>
                            <TableRow hover sx={{ '& > td': { borderBottom: '0px', cursor: 'pointer' } }}>
                                <TableCell align="center">{key+1}</TableCell>
                                <TableCell align="left">{prediction.raw_text}</TableCell>
                                <TableCell align="center">{prediction.expected_category}</TableCell>
                                <TableCell align="center">{prediction.predicted_category}</TableCell>
                                <TableCell align="center">
                                    {
                                        prediction.expected_category === prediction.predicted_category ? (
                                            <Typography color={'green'}>
                                                <Icon icon="lets-icons:check-fill" fontSize='30px' />
                                            </Typography>
                                        ) : (
                                            <Typography color={'red'}>
                                                <Icon icon="healthicons:x-negative" fontSize='26px' />
                                            </Typography>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                    <Box sx={{ paddingTop: 2, paddingBottom: 10, overflowX: 'auto' }}>
                                        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed"  }}>
                                        <Table size='small' aria-label="simple table">
                                            <TableHead>
                                                <StyledTableRowHead>
                                                    <TableCell align="center">KATEGORI</TableCell>
                                                    {Object.keys(prediction.detail.bobot).map((key) => (
                                                        <TableCell key={key} align="center">{key}</TableCell>
                                                    ))}
                                                </StyledTableRowHead>
                                                {props.optCategoryProp.map((kategori: CategoryType, key: number) => (
                                                    <StyledTableRow key={key}>
                                                        <TableCell align="center">{kategori.name}</TableCell>
                                                        {Object.keys(prediction.detail.bobot).map((key) => (
                                                            <TableCell key={key} align="center">{prediction.detail.bobot[key][kategori.name]}</TableCell>
                                                        ))}
                                                    </StyledTableRow>
                                                ))}
                                            </TableHead>
                                        </Table>
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )

}

export default TrainingMultiResult