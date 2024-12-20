import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ViewerContext } from './Viewer';
import * as Cesium from 'cesium';

export const JsoLineWriter: React.FC = () => {
    const viewer = useContext(ViewerContext);
    const [requestData, setRequestData] = useState<{
        name: string;
        longitude1: number | null;
        latitude1: number | null;
        altitude1: number | null;
        longitude2: number | null;
        latitude2: number | null;
        altitude2: number | null;
    }>({
        name: "Hiroshimast",
        longitude1: null,
        latitude1: null,
        altitude1: null,
        longitude2: null,
        latitude2: null,
        altitude2: null,
    });

    const [firstClick, setFirstClick] = useState<{
        longitude: number | null;
        latitude: number | null;
        altitude: number | null;
    }>({
        longitude: null,
        latitude: null,
        altitude: null,
    });

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }

        viewer.screenSpaceEventHandler.setInputAction((click: { position: Cesium.Cartesian2; }) => {
            const cartesian = viewer.camera.pickEllipsoid(click.position);
            if (cartesian) {
                const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                const longitude = Cesium.Math.toDegrees(cartographic.longitude);
                const latitude = Cesium.Math.toDegrees(cartographic.latitude);
                const altitude = cartographic.height + 100;

                if (firstClick.longitude === null) {
                    // 最初のクリック位置を保存
                    setFirstClick({ longitude, latitude, altitude });
                    console.log("First Click Coordinates:", longitude, latitude, altitude);
                } else {
                    // 2回目のクリック位置を保存し、requestDataを更新
                    setRequestData({
                        name: "Hiroshimast",
                        longitude1: firstClick.longitude,
                        latitude1: firstClick.latitude,
                        altitude1: firstClick.altitude,
                        longitude2: longitude,
                        latitude2: latitude,
                        altitude2: altitude,
                    });
                    console.log("Second Click Coordinates:", longitude, latitude, altitude);
                    // 最初のクリック位置をリセット
                    setFirstClick({ longitude: null, latitude: null, altitude: null });
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        return () => {
            viewer.destroy();
        };
    }, [viewer, firstClick]);

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