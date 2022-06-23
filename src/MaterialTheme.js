import { createTheme } from '@material-ui/core'
import './assets/fonts/Avenir-Roman-12.ttf'

export const AppTheme = createTheme({
    typography: {
        fontFamily: [
            "Avenir-Roman",
            
        ].join(",")
    },
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#aaaa00'
        }
    },
    overrides: {
        MuiSwitch: {
            switchBase: {
                // Controls default (unchecked) color for the thumb
                color: "#fff"
            },
            colorSecondary: {
                "&$checked": {
                    // Controls checked color for the thumb
                    color: "#fff"
                }
            },
            track: {
                // Controls default (unchecked) color for the track
                opacity: 0.2,
                backgroundColor: "#fff",
                "$checked$checked + &": {
                    // Controls checked color for the track
                    opacity: 0.7,
                    backgroundColor: "#fff"
                }
            }
        }
    }
})




