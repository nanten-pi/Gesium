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
import {OpenChiriinchizu} from './MapLayer/OpenChiriinchizu'
import { Pointer,PointerProps} from './Pointer'
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
import { Outlet} from 'react-router-dom';
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Close as CloseIcon } from "@mui/icons-material";
import { Button, SelectChangeEvent, CssBaseline } from '@mui/material';
import { Liner } from './Liner'
import { JsoLineWriter } from './JsoLineWriter'
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

const hazard_dosekiryu = "https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki_data/34/{z}/{x}/{y}.png";
const hazard_sinsui_kuni = "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_pref_data/34/{z}/{x}/{y}.png";
const hazard_sinsui_ken = "https://disaportaldata.gsi.go.jp/raster/01_flood_l1_shinsuishin_newlegend_pref_data/34/{z}/{x}/{y}.png";
const hazard_sinsui_kuni_jikan ="https://disaportaldata.gsi.go.jp/raster/01_flood_l2_keizoku_pref_data/34/{z}/{x}/{y}.png";
const hazard_sinsui_kaoku = "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_kaokutoukai_hanran_pref_data/34/{z}/{x}/{y}.png"
const hazard_naisui = "https://disaportaldata.gsi.go.jp/raster/02_naisui_pref_data/34/{z}/{x}/{y}.png";
const hazard_tunami = "https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_pref_data/34/{z}/{x}/{y}.png";
const hazard_kyushakeichi ="https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki_data/34/{z}/{x}/{y}.png";
const hazard_jisuberi = "https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki_data/34/{z}/{x}/{y}.png";
const hazard_nadare = "https://disaportaldata.gsi.go.jp/raster/05_nadarekikenkasyo_data/34/{z}/{x}/{y}.png";
const chirinchizu_ortho ="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png";
const plateau_ortho ="https://api.plateauview.mlit.go.jp/tiles/plateau-ortho-2023/{z}/{x}/{y}.png";
const mdTheme = createTheme();
//ここからメインプログラム
export const App: React.FC = () => {

  interface ListItem {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    altitude: number;
    longitude1: number;
    latitude1: number;
    altitude1: number;
    longitude2: number;
    latitude2: number;
    altitude2: number;
  }
  //pin機能用
  const [lists, setLists] = useState<any[]>([]);
  const [liners, setLiners] = useState<any[]>([]);
  //hazardマップ
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

  const handleChange0 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[0] = event.target.checked;
    setChecked(newChecked);
    if (newChecked[0] === true) {
      setOrtho(plateau_ortho);
    }
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[1] = event.target.checked;
    setChecked(newChecked);
    if (newChecked[1] === true) {
      setOrtho(chirinchizu_ortho);
    }
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[2] = event.target.checked;
    setChecked(newChecked);
    if (newChecked[2] === true) {
      setHazard(hazard_sinsui_kuni);
    }
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[3] = event.target.checked;
    setChecked(newChecked);
    if (newChecked[3] === true) {
      setHazard(hazard_sinsui_kuni_jikan);
    }
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[4] = event.target.checked;
    setChecked(newChecked);
    if (newChecked[4] === true) {
      setHazard(hazard_dosekiryu);
    }
  };

  const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[5] = event.target.checked;
    setChecked(newChecked);
    if (newChecked[5] === true) {
      setHazard(hazard_tunami);
    }
  };
  //これはAPIのやつ（pin機能）
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
    }, 5000); // 30秒ごとにデータを取得

    // コンポーネントのアンマウント時にインターバルをクリア
    return () => clearInterval(intervalId);
  }, []);
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
              検証用アプリ
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
          <Divider />
          <Divider />
          <Typography variant="h4" gutterBottom>オルソ画像選択</Typography>
          <Divider />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked[0]} onChange={handleChange0} />} label="PLATEAU地図" />
            <FormControlLabel control={<Checkbox checked={checked[1]} onChange={handleChange1} />} label="地理院地図" />
          </FormGroup>
          <Divider />
          <Divider />
          <Typography variant="h4" gutterBottom>ハザードマップ切り替え</Typography>
          <Divider />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked[2]} onChange={handleChange2} />} label="浸水" />
            <FormControlLabel control={<Checkbox checked={checked[3]} onChange={handleChange3} />} label="浸水時間" />
            <FormControlLabel control={<Checkbox checked={checked[4]} onChange={handleChange4} />} label="土石流" />
            <FormControlLabel control={<Checkbox checked={checked[5]} onChange={handleChange5} />} label="津波" />
          </FormGroup>
          <Divider />
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
            <TempOrthoLoader path={ortho} />
            <JsoWriter />
            <HazardMapData path={hazard} />
            <PlateauModelLatest path='https://assets.cms.plateau.reearth.io/assets/cb/7bac72-24c1-4901-b1f4-9373e2feb738/34100_hirosima-shi_city_2022_citygml_3_op_bldg_3dtiles_34102_higashi-ku_lod2' />
            <PlateauModelLatest path='https://assets.cms.plateau.reearth.io/assets/5d/e5c519-682e-43fc-9bbb-744b8dd665ba/34100_hirosima-shi_city_2022_citygml_3_op_bldg_3dtiles_34103_minami-ku_lod2' />
            <PlateauModelLatest path='https://assets.cms.plateau.reearth.io/assets/a6/2ab468-91d9-4f5b-bdb2-058037d6e257/34100_hirosima-shi_city_2022_citygml_3_op_bldg_3dtiles_34105_asaminami-ku_lod1' />
          </Viewer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
