import React from "react"
import { ShowLocationButton } from "~features/showLocationButton"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-[500px] plasmo-h-[500px] " >
      <ShowLocationButton />
    </div>
  )
}

export default IndexPopup
