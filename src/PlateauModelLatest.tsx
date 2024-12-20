import { useEffect, useState, useContext } from 'react';
import { Cesium3DTileset, Cesium3DTileStyle } from 'cesium';
import { ViewerContext } from './Viewer';

interface PlateauModelLatestProps {
    path:string;
    color?: string;
}

export const PlateauModelLatest: React.FC<PlateauModelLatestProps> = ({
    path,
    color = '#ffffff'
}) => {
    const [tileset, setTileset] = useState<Cesium3DTileset>();
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }
        //新式の取得方法を実装
        Cesium3DTileset.fromUrl(`${path}/tileset.json`)
            .then((tileset) => {
                viewer.scene.primitives.add(tileset);
                setTileset(tileset);
            })
            .catch(error => {
                console.log("Error loading tileset", error);
            });
        return () => {
            if (!viewer.isDestroyed()) {
                viewer.scene.primitives.remove(tileset);
            }
            setTileset(undefined);
        };
    }, [viewer]);
    useEffect(() => {
        if (tileset != null) {
            tileset.style = new Cesium3DTileStyle({
                color: `color("${color}")`
            });
        }
    }, [color, tileset]);

    return null;
};
//読み込み時に<PlateauModelLatest path='url(without tilest.json)' />