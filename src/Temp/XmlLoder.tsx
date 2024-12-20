import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
import { Color, PolygonGraphics, Cartesian3 } from 'cesium';

export const XmlLoder: React.FC = () => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }

        const loadAndAddData = async () => {
            try {
                // XML データを読み込む
                const response = await fetch('./A31-30-21_8707010001.xml');
                const xmlText = await response.text();

                // XML を解析
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

                // ポリゴンの座標を取得 (例: <coordinates> タグから取得)
                const coordinatesElement = xmlDoc.getElementsByTagName('coordinates')[0];
                if (!coordinatesElement || !coordinatesElement.textContent) {
                    throw new Error('Coordinates not found in the XML file.');
                }

                const coordinates = coordinatesElement.textContent;
                const coordsArray = coordinates.trim().split(/\s+/).map(coord => {
                    const [lon, lat] = coord.split(',').map(Number);
                    return Cartesian3.fromDegrees(lon, lat);
                });

                // ポリゴンを生成
                const polygon = new PolygonGraphics({
                    hierarchy: coordsArray,
                    material: Color.RED.withAlpha(0.5),
                    outline: true,
                    outlineColor: Color.BLACK
                });

                // ポリゴンをエンティティとして追加
                viewer.entities.add({
                    polygon
                });
            } catch (error) {
                console.error('Error loading or parsing XML:', error);
            }
        };

        loadAndAddData();
    }, [viewer]);

    return null;
};