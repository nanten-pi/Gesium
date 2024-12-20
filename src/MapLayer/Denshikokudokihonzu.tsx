import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
import { UrlTemplateImageryProvider } from 'cesium';

export const Denshikokudokihonzu: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        const imageProvider = new UrlTemplateImageryProvider({
            url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
            maximumLevel: 19
        });
        viewer.scene.imageryLayers.addImageryProvider(imageProvider);
    }, [viewer]);

    return null;
};