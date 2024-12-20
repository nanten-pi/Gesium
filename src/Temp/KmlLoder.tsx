import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
//importしたい機能を「,」の後に追記
import { KmlDataSource } from 'cesium';

export const KmlLoder: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        KmlDataSource.load('~/data/testdata.kml')
            .then(function (dataSource) {
                viewer.dataSources.add(dataSource);
                viewer.zoomTo(dataSource);  // KML内の全てのエンティティにズーム
            })
            .catch(function (error) {
                console.error('Error loading KML:', error);
            });
    }, [viewer]);

    return null;
};