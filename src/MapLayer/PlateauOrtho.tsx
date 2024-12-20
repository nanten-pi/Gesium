import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
import { UrlTemplateImageryProvider } from 'cesium';

export const PlateauOrtho: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        const imageProvider = new UrlTemplateImageryProvider({
            url: 'https://api.plateauview.mlit.go.jp/tiles/plateau-ortho-2023/{z}/{x}/{y}.png',
            maximumLevel: 19
        });
        viewer.scene.imageryLayers.addImageryProvider(imageProvider);
    }, [viewer]);

    return null;
};