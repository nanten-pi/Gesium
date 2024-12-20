import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
//OpenStreetMap方式の読み込みとUrlTemplate式の読み込みがあるそうです
import { OpenStreetMapImageryProvider, UrlTemplateImageryProvider } from 'cesium';

export const OpenChiriinchizu: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        var positron = new OpenStreetMapImageryProvider({
            url: 'https://cyberjapandata.gsi.go.jp/xyz/ort/',
            fileExtension: 'jpg',
            credit: '電子国土基本図（オルソ画像）'
        });
        viewer.scene.imageryLayers.addImageryProvider(positron);
    }, [viewer]);

    return null;
};