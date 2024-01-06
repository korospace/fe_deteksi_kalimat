import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { RemoveLocalToken, RemoveLocalUserInfo } from "../../utils/auth";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        RemoveLocalToken()
        RemoveLocalUserInfo()
        navigate('/login')
        enqueueSnackbar("Logout berhasil", { variant: 'success' });
    }

    return (
        <Box sx={{ width: '100%', height: '100vh', background: 'white' }}>
            <Dialog
                open={true}
                onClose={() => navigate(-1)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Logout?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Anda yakin ingin keluar
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate(-1)}>
                        cancle
                    </Button>
                    <Button onClick={() => handleLogout()} autoFocus>
                        logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Logout;
