import * as Cesium from 'cesium'
import React, { useContext, useEffect } from 'react'

import { ViewerContext } from '../Viewer'

export const PlateauTerrain: React.FC = () => {
    const viewer = useContext(ViewerContext)
    useEffect(() => {
        if (viewer?.isDestroyed() !== false) {
            return
        }
        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNjk0MTM4NC1lMWI0LTQxNTgtYjcxZS01ZWJhMGJlMTE1MWQiLCJpZCI6MTQ5ODk3LCJpYXQiOjE3MTUxNTEyODZ9.2aUmEQ2-fDsjf-XeC6-hZpwkgwLse3yXoXF4xTOvPAY";
        viewer.scene.setTerrain(
            new Cesium.Terrain(
                // 770371と2488101どっちが正しいんだ?
                // 770371だとOrthoまでぶっ飛ばされたなんで?
                Cesium.CesiumTerrainProvider.fromIonAssetId(2488101),
            ),
        );
    }, [viewer])

    return null
}