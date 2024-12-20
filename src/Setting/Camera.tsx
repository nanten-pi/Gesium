import { Cartesian3, HeadingPitchRoll } from 'cesium'
import React, { useContext, useEffect } from 'react'

import { ViewerContext } from '../Viewer'

export const Camera: React.FC = () => {
  const viewer = useContext(ViewerContext)
  useEffect(() => {
    if (viewer?.isDestroyed() !== false) {
      return
    }
    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(132.44, 34.397 , 2000),
      orientation: new HeadingPitchRoll(Math.PI / 2, -Math.PI / 4, 0)
    })
  }, [viewer])
  return null
}