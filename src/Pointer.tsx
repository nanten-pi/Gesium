import { ViewerContext } from './Viewer';
import { useEffect, useContext } from 'react';
//importしたい機能を「,」の後に追記
import { Cartesian3, Color} from 'cesium';
export interface PointerProps {
    longitude: number;
    latitude: number;
    altitude: number;
    names: string;
}
export const Pointer: React.FC<PointerProps> = ({
    longitude,
    latitude,
    altitude,
    names,
}) => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        var point = viewer.entities.add({
            name: names, //レイヤ名
            description: 'テスト',　//レイヤの説明
            position: Cartesian3.fromDegrees(longitude, latitude, altitude), //経度,緯度,高さ
            point: {
                pixelSize: 15, //ポイントのサイズ
                color: Color.GREEN //ポイントの色
            }
        });
    }, [viewer, longitude, latitude, altitude, names]);

    return null;
};