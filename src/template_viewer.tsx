import { ViewerContext } from './Viewer';
import { useEffect, useContext } from 'react';
//importしたい機能を「,」の後に追記
import { UrlTemplateImageryProvider } from 'cesium';

export const template_viewer: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        //ここから先に追記(中身を削除して)
        var positron = new UrlTemplateImageryProvider({
            url: 'url~~~.png',
            credit: 'creditがある場合は記入'
        });
        //viewerに渡せます
        viewer.scene.imageryLayers.addImageryProvider(positron);
    }, [viewer]);

    return null;
};
//最後はApp.tsx(のviewer直下)にモジュールを読み込ませてください
//例
//import {template_viewer} from './template_viewer'