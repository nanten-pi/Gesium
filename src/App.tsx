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
import {OpenChiriinchizu} from './MapLayer/OpenChiriinchizu'
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
import { Outlet} from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Close as CloseIcon } from "@mui/icons-material";
import { Button, SelectChangeEvent, CssBaseline } from '@mui/material';
import { Denshikokudokihonzu } from './MapLayer/Denshikokudokihonzu'
import { TempOrthoLoader } from './MapLayer/TempOrthoLoader'

const drawerWidth = 240; // Define drawerWidth with an appropriate value

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
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
//ここからメインプログラム
export const App: React.FC = () => {
  const [hazard, setHazard] = useState<string>('https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_pref_data/34/{z}/{x}/{y}.png');
  //オルソ
  const [ortho, setOrtho] = useState<string>('https://api.plateauview.mlit.go.jp/tiles/plateau-ortho-2023/{z}/{x}/{y}.png');
  const [open, setOpen] = React.useState(true);// サイドの。
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [sort, setSort] = React.useState(''); //ここからプルダウンのやつです
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const [openinfo, setOpeninfo] = React.useState(false);

  const handleClickOpen = () => {
    setOpeninfo(true);
  };

  const handleClose = () => {
    setOpeninfo(false);
  };

  const [checked, setChecked] = React.useState<boolean[]>(Array(6).fill(false));
  useEffect(() => {
    // hazard の値が変わったときに実行される処理
    console.log('Hazard URL updated:', hazard);
  }, [hazard]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start" // ここでボタンの種類増やしたいな
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#ffffff"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Gesium
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#101010"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ハンバーガーメニュー
            </Typography>
          </Toolbar>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Viewer>
            <Camera />
            <Clock />
            <Lighting />
            <PlateauTerrain />
            <GeologicalSurveyData />
          </Viewer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
