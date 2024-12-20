import { useEffect, useState, useContext } from 'react';
import { Cesium3DTileset, Cesium3DTileStyle} from 'cesium';
import { ViewerContext } from '../Viewer';

interface PlateauTilesetProps {
  path: string;
  color?: string;
}

export const PlateauTileset: React.FC<PlateauTilesetProps> = ({
  path,
  color = '#ffffff'
}) => {
  const [tileset, setTileset] = useState<Cesium3DTileset>();
  const viewer = useContext(ViewerContext);

  useEffect(() => {
    if (viewer?.isDestroyed() !== false) {
      return;
    }
    //この形式の取得方法のレファレンスは公式から削除されていた、使えない場合memoの11行のurlを使う必要あり
    Cesium3DTileset.fromUrl(`https://plateau.geospatial.jp/main/data/3d-tiles/${path}/tileset.json`)
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
  }, [path, viewer]);

  useEffect(() => {
    if (tileset != null) {
      tileset.style = new Cesium3DTileStyle({
        color: `color("${color}")`
      });
    }
  }, [color, tileset]);

  return null;
};