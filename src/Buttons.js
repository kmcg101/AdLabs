import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@mui/material/IconButton';


import { makeStyles } from '@material-ui/core/styles'

// try passing in the theme and referencing the theme as theme.palette.primary.main
const useStyles = makeStyles((AppTheme) => ({

    continueButton: {
        position: "relative",
        width: "21.5%",
        height: "27%",
        backgrounColor: "transparent",
        border: "2px white solid",
        borderRadius: "4px",
        color: "white",
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0px 4px 9.4px 0.6px rgba(0, 0, 0, 0.33)",
        userSelect: "none",
        '&:hover': {
            border: "2px #009bdb solid"
        }
    },
    backButton: {
        position: "absolute",
        top: "-40px",
        left: "-60px",
        // this controls the text color for some reason
        color: AppTheme.palette.primary.main,
        backgroundColor: AppTheme.palette.secondary.main,
    }
}))


export const ContinueButton = (props) => {
    const currentPageNumber = props.currentPageNumber;
    const handleContinueButtonPressed = props.handleContinueButtonPressed;
    const classes = useStyles()
    return (

        <Button onClick={handleContinueButtonPressed} className={classes.continueButton} >{currentPageNumber === 3 ? "CREATE AD FILES" : "CONTINUE"}</Button>
    )
}
export const BackButton = (props) => {

    const handleBackButton = props.handleBackButton;
    const classes = useStyles()
    return (
        <Button onClick={handleBackButton} className={classes.backButton} variant='contained'>
            Back

        </Button>
        // <Button onClick={handleBackButton} className={classes.backButton} >}</Button>
    )
}