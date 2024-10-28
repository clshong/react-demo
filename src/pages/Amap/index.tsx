
/**
 * https://uiwjs.github.io/react-amap/#/control-bar-control
 * 需要换akey才能正常显示
 */
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation, MapTypeControl, Marker } from '@uiw/react-amap';
const Amap = () => {
    return (
        <APILoader version="2.0.5" akey="944703c83c6f87d67f27606904c7f3c4">
            <Map style={{ height: "100vh" }} zoom={10}>
                <ScaleControl offset={[16, 30]} position="LB" />
                <ToolBarControl offset={[16, 10]} position="RB" />
                <ControlBarControl offset={[16, 180]} position="RB" />
                <MapTypeControl offset={[16, 20]} position="RT" />
                <Geolocation
                    maximumAge={100000}
                    borderRadius="5px"
                    position="RB"
                    offset={[16, 80]}
                    zoomToAccuracy={true}
                    showCircle={true}
                />
            </Map>
        </APILoader>
    )

}

export default Amap