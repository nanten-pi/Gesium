import React, { useEffect, useState } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import { Camera } from './Setting/Camera'
import { Clock } from './Setting/Clock'
import { Lighting } from './Setting/Lighting'
import { Viewer } from './Viewer'
//1.Plateau公式の地図,2.地質調査総合センター図 3.ハザードマップ図
import { PlateauOrtho } from './MapLayer/PlateauOrtho'
import { GeologicalSurveyData } from './MapLayer/GeologicalSurveyData'
import { HazardMapData } from './MapLayer/HazardMapData'
import { PlateauTerrain } from './Setting/PlateauTerrain'
import { PlateauModelLatest } from './PlateauModelLatest'
import { OpenChiriinchizu } from './MapLayer/OpenChiriinchizu'
import { Pointer, PointerProps } from './Pointer'
import { JsoWriter } from './JsoWriter'
import {
    Box,
    AppBar as MuiAppBar,
    Toolbar as MuiToolbar,
    IconButton,
    Typography,
    Drawer as MuiDrawer,
    AppBarProps as MuiAppBarProps,
    Toolbar,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Dialog,
    ListItemText,
    List,
    ListItemButton,
    FormControl,
    Select,
    InputLabel
} from "@mui/material";
import { Outlet } from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Close as CloseIcon } from "@mui/icons-material";
import { Button, SelectChangeEvent, CssBaseline } from '@mui/material';
import { Liner } from './Liner'
import { JsoLineWriter } from './JsoLineWriter'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },//この辺が情報入力画面の
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();
export const App: React.FC = () => {
    const [lists, setLists] = useState<any[]>([]);
    const [liners, setLiners] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async (url: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setState(data.lists || data.liners); // APIのデータをStateにセット/ ローディング状態を解除
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const intervalId = setInterval(() => {
            fetchData('http://localhost:3001/lists', setLists);
            fetchData('http://localhost:3001/lists2', setLiners);
        }, 30000); // 30秒ごとにデータを取得

        // コンポーネントのアンマウント時にインターバルをクリア
        return () => clearInterval(intervalId);
    }, []);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed">
                    <MuiToolbar>
                        <IconButton color="inherit" edge="start">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">アプリケーション</Typography>
                    </MuiToolbar>
                </AppBar>
                <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                    <MuiToolbar />
                    <Viewer>
                        {lists.map((list) => (
                            <Pointer
                                key={list.id}
                                longitude={list.longitude}
                                latitude={list.latitude}
                                altitude={list.altitude}
                                names={list.name}
                            />
                        ))}
                        {liners.map((liner) => (
                            <Liner
                                key={liner.id}
                                longitude1={liner.longitude1}
                                latitude1={liner.latitude1}
                                altitude1={liner.altitude1}
                                longitude2={liner.longitude2}
                                latitude2={liner.latitude2}
                                altitude2={liner.altitude2}
                                names={liner.name}
                            />
                        ))}
                        <Camera />
                        <Clock />
                        <Lighting />
                        <PlateauTerrain />
                        <OpenChiriinchizu />
                        <JsoLineWriter />
                        <HazardMapData path='https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_pref_data/34/{z}/{x}/{y}.png' />
                        <PlateauModelLatest path='https://assets.cms.plateau.reearth.io/assets/cb/7bac72-24c1-4901-b1f4-9373e2feb738/34100_hirosima-shi_city_2022_citygml_3_op_bldg_3dtiles_34102_higashi-ku_lod2' />
                        <PlateauModelLatest path='https://assets.cms.plateau.reearth.io/assets/5d/e5c519-682e-43fc-9bbb-744b8dd665ba/34100_hirosima-shi_city_2022_citygml_3_op_bldg_3dtiles_34103_minami-ku_lod2' />
                        <PlateauModelLatest path='https://assets.cms.plateau.reearth.io/assets/a6/2ab468-91d9-4f5b-bdb2-058037d6e257/34100_hirosima-shi_city_2022_citygml_3_op_bldg_3dtiles_34105_asaminami-ku_lod1' />
                    </Viewer>
                </Box>
            </Box>
            <Button variant="contained" color="primary" onClick={() => alert('Button clicked!')}>
                MUI Button
            </Button>
        </ThemeProvider>
    );
};