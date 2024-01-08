import { useEffect, useState } from "react";
import { Box, Grid, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";

/* Types */
import { ResultSingleType } from "../model/Types";
import { CategoryType } from "../../Category/model/Types";
/* Components */
import { StyledTableRow } from "./StyledComponents";

/* Props */
type Props = {
    dataProp?: ResultSingleType,
    optCategoryProp: CategoryType[]
};

const TrainingSingleResult = (props: Props) => {
    /* Data  */
    const [dataResult, setDataResult] = useState<ResultSingleType>()

    useEffect(() => {
        setDataResult(dataResult)
        console.log(dataResult);
    }, [props])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Category
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.best_category}
                    </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Typography fontSize={'14px'}>
                        Score
                    </Typography>
                </Grid>
                <Grid item xs={11} sx={{ display: 'flex' }}>
                    <Typography marginRight={'25px'}>
                        :
                    </Typography>
                    <Typography fontSize={'14px'}>
                        {props.dataProp?.best_score}
                    </Typography>
                </Grid>
            </Grid>

            <Table size='small' aria-label="simple table" sx={{ marginTop: '36px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">KATEGORI</TableCell>
                        {Object.keys(props.dataProp?.bobot).map((key) => (
                            <TableCell key={key} align="center">{key}</TableCell>
                        ))}
                    </TableRow>
                    {props.optCategoryProp.map((kategori: CategoryType, key: number) => (
                        <StyledTableRow key={key}>
                            <TableCell align="center">{kategori.name}</TableCell>
                            {Object.keys(props.dataProp?.bobot).map((key) => (
                                <TableCell key={key} align="center">{props.dataProp?.bobot[key][kategori.name]}</TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableHead>
            </Table>
        </Box>
    )

}

export default TrainingSingleResult