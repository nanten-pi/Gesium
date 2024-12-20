import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ViewerContext } from './Viewer';
import * as Cesium from 'cesium';

export const JsoWriter: React.FC = () => {
    const viewer = useContext(ViewerContext);
    const [requestData, setRequestData] = useState<{
        name: string;
        longitude: number | null;
        latitude: number | null;
        altitude: number | null;
    }>({
        name: "Hiroshimast",
        longitude: null,
        latitude: null,
        altitude: null,
    });

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        // クリックイベントの設定
        viewer.screenSpaceEventHandler.setInputAction((click: { position: Cesium.Cartesian2; }) => {
            // クリック位置を地理座標に変換
            const cartesian = viewer.camera.pickEllipsoid(click.position);
            if (cartesian) {
                var longitude = 134
                var latitude = 34
                var altitude = 0
                const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                longitude = Cesium.Math.toDegrees(cartographic.longitude);
                latitude = Cesium.Math.toDegrees(cartographic.latitude);
                altitude = cartographic.height + 100;

                // requestDataにクリック位置の座標をセット
                setRequestData({
                    name: "Hiroshimast",
                    longitude,
                    latitude,
                    altitude,
                });

                console.log("Clicked Coordinates:", longitude, latitude, altitude);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        return () => {
            viewer.destroy();
        };
    }, [viewer]);

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/lists', requestData);
            console.log('Data sent successfully:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div>
            <button onClick={postData}>Send Data</button>
        </div>
    );
};