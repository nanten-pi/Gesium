import { ViewerContext } from '../Viewer';
import { useEffect, useContext } from 'react';
import { UrlTemplateImageryProvider } from 'cesium';

interface HazardMapProps {
    path: string;
}

export const TempOrthoLoader: React.FC<HazardMapProps> = ({
    path
}) => {
    const viewer = useContext(ViewerContext);

    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return;
        }

        // 既存のレイヤーをクリア(しません)
        const layers = viewer.scene.imageryLayers;

        // 新しいレイヤーを追加
        const positronProvider = new UrlTemplateImageryProvider({
            url: path,
            credit: '国土交通省'
        });
        const positronLayer = layers.addImageryProvider(positronProvider);

        // クリーンアップ関数を返して、コンポーネントのアンマウント時にレイヤーを削除
        return () => {
            layers.remove(positronLayer);
        };
    }, [viewer, path]); // path を依存関係に追加

    return null;
};