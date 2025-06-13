import Alert from '@mui/material/Alert';
const ErrorDiv = ({ errorContent }) => {
    return (
        <>
            <Alert severity="error">{errorContent}</Alert>
        </>
    )
}
export default ErrorDiv