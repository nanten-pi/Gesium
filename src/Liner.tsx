import { ViewerContext } from './Viewer';
import { useEffect, useContext } from 'react';
//importしたい機能を「,」の後に追記
import { Cartesian3, Color } from 'cesium';
export interface LinerProps {
    longitude1: number;
    latitude1: number;
    altitude1: number;
    longitude2: number;
    latitude2: number;
    altitude2: number;
    names: string;
}
export const Liner: React.FC<LinerProps> = ({
    longitude1,
    latitude1,
    altitude1,
    longitude2,
    latitude2,
    altitude2,
    names,
}) => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        var line1 = viewer.entities;
        line1.add({
            polyline: {
                positions:
                    Cartesian3.fromDegreesArrayHeights([
                        longitude1, latitude1, altitude1,
                        longitude2, latitude2, altitude2
                    ]),
                width: 5,
                material: Color.RED
            }
        });
    }, [viewer, longitude1, latitude1, altitude1, longitude2, latitude2, altitude2, names]);

    return null;
};