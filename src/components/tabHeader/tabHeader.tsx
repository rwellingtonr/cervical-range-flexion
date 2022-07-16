import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { Person, Analytics, AdUnits } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

enum TabsBar {
    "patientRegistration",
    "measurement",
    "patientHistory",
}

function a11yProps(index: any) {
    return {
        id: `action-tab-${index}`,
        "aria-controls": `action-tabpanel-${index}`,
    }
}

export default function FloatingActionButtonZoom() {
    const [value, setValue] = React.useState(1)
    const navigate = useNavigate()

    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue)
        navigate(`/${TabsBar[newValue]}`)
    }

    const patient = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Person style={{ padding: "0 10px" }} />
                Paciente
            </div>
        )
    }
    const measurement = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Analytics style={{ padding: "0 10px" }} />
                Coleta
            </div>
        )
    }
    const history = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <AdUnits style={{ padding: "0 10px" }} />
                Histórico
            </div>
        )
    }

    return (
        <Box
            sx={{
                width: 500,
                "& .css-v526sl-MuiPaper-root-MuiAppBar-root": {
                    boxShadow: "none",
                },
            }}
        >
            <AppBar position="static" color="transparent">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                    sx={{
                        boxShadow: "none",
                        "& .Mui-focusVisible": {
                            color: "#8fdac8",
                        },
                    }}
                >
                    <Tab label={patient()} {...a11yProps(0)} />
                    <Tab label={measurement()} {...a11yProps(1)} />
                    <Tab label={history()} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
        </Box>
    )
}
