import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
import { UrlTemplateImageryProvider } from 'cesium';

export const GeologicalSurveyData: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        var positron = new UrlTemplateImageryProvider({
            url: 'https://gbank.gsj.jp/seamless/v2/api/1.2/tiles/{z}/{y}/{x}.png',
            credit: '地質調査総合センター'
        });
        viewer.scene.imageryLayers.addImageryProvider(positron);
    }, [viewer]);

    return null;
};