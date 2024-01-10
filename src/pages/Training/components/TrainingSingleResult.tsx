import { Fragment, useEffect, useState } from "react";
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Icon } from '@iconify/react';

/* Types */
import { CalculateType, ResultSingleType } from "../model/Types";
/* Components */
import { StyledTableRow, StyledTableRowHead } from "./StyledComponents";

/* Props */
type Props = {
    dataProp?: ResultSingleType,
};

const TrainingSingleResult = (props: Props) => {
    /* Data  */
    const [dataResult, setDataResult] = useState<ResultSingleType>()

    useEffect(() => {
        setDataResult(dataResult)
    }, [props])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Text Mentah
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.raw_text}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Text Mateng
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.preproccess_text}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Kalimat Utama
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.summary}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Total Semua Kata
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.totallkata}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Tresh Hold
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.tresh_hold}
                    </Typography>
                </Grid>
            </Grid>

            <Table size='small' aria-label="simple table" sx={{ marginTop: '20px' }}>
                <colgroup>
                    <col width="100" />
                    <col width="*" />
                    <col width="200" />
                </colgroup>

                <TableHead>
                    <StyledTableRowHead>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="left">Kalimat</TableCell>
                        <TableCell align="center">Total Kata</TableCell>
                        <TableCell align="center">WS Tertinggi</TableCell>
                    </StyledTableRowHead>
                </TableHead>

                <TableBody>
                    {props.dataProp?.calculate.map((row: CalculateType, key: number) => (
                        <Fragment key={key}>
                            <StyledTableRow hover sx={{ '& > td': { borderBottom: '0px', cursor: 'pointer' } }}>
                                <TableCell align="center">{key+1}</TableCell>
                                <TableCell align="left">{row.kalimat}</TableCell>
                                <TableCell align="center">{row.totkata}</TableCell>
                                <TableCell align="center">
                                    {
                                        row.WS === props.dataProp?.best_score ? (
                                            <Typography color={'green'}>
                                                <Icon icon="lets-icons:check-fill" fontSize='30px' />
                                            </Typography>
                                        ) : (
                                            ''
                                        )
                                    }
                                </TableCell>
                            </StyledTableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ paddingBottom: '20px', paddingTop: '20px' }} colSpan={2}>
                                    <Table size='small' aria-label="simple table">
                                        <colgroup>
                                            <col width="200" />
                                            <col width="200" />
                                            <col width="200" />
                                            <col width="200" />
                                        </colgroup>

                                        <TableHead>
                                            <StyledTableRowHead>
                                                <TableCell align="center">Kata</TableCell>
                                                <TableCell align="center">Jumlah</TableCell>
                                                <TableCell align="center">TFWi</TableCell>
                                                <TableCell align="center">IDFWi</TableCell>
                                                <TableCell align="center">WWi</TableCell>
                                            </StyledTableRowHead>
                                            {row.arr_kata.map((kata: string, key: number) => (
                                                <StyledTableRow key={key}>
                                                    <TableCell align="center">{kata}</TableCell>
                                                    <TableCell align="center">{row.tot_kata_dalam_text[kata]}</TableCell>
                                                    <TableCell align="center">{row.TFWi[kata]}</TableCell>
                                                    <TableCell align="center">{row.IDFWi[kata]}</TableCell>
                                                    <TableCell align="center">{row.WWi[kata]}</TableCell>
                                                </StyledTableRow>
                                            ))}
                                            <TableRow key={key}>
                                                <TableCell colSpan={5}>
                                                    <Table>
                                                        <colgroup>                                        
                                                            <col width="20" />
                                                            <col width="30" />
                                                            <col width="*" />
                                                        </colgroup>
                                                        <TableHead>
                                                            <TableRow sx={{ borderBottom: '0px' }}>
                                                                <TableCell align="left">TWWi</TableCell>
                                                                <TableCell align="left">:</TableCell>
                                                                <TableCell align="left">{row.TWWi}</TableCell>
                                                            </TableRow>
                                                            <TableRow sx={{ borderBottom: '0px' }}>
                                                                <TableCell align="left">NFS</TableCell>
                                                                <TableCell align="left">:</TableCell>
                                                                <TableCell align="left">{row.NFS}</TableCell>
                                                            </TableRow>
                                                            <TableRow sx={{ borderBottom: '0px' }}>
                                                                <TableCell align="left">WS</TableCell>
                                                                <TableCell align="left">:</TableCell>
                                                                <TableCell align="left">{row.WS}</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                    </Table>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )

}

export default TrainingSingleResult