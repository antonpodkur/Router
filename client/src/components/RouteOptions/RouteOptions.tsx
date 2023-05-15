import { Button, Icon } from "@vechaiui/react"
import { LatLngExpression } from "leaflet"
import {Save, Trash2} from "react-feather"
import { LngLat } from "../../services/LocationService"
import { useState } from "react"
import SaveRouteModal from "./SaveRouteModal"
import DeleteRouteModal from "./DeleteRouteModal"

interface RouteOptionsProps {
    coords: Array<LatLngExpression>
    points: Array<LngLat>
    deleteRoute: () => void
}

const RouteOptions: React.FC<RouteOptionsProps> = ({coords, points, deleteRoute}) => {
    const [showSave, setShowSave] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    return (
        <div className="flex w-full items-center justify-center mb-4 mt-2">
            <Button
                variant="solid"
                color="primary" 
                leftIcon={<Icon as={Save} label="save" className="w-4 h-4 mr-1"/>}
                className="mr-2"
                onClick={() => setShowSave(true)}
            >
                Save
            </Button>
            <SaveRouteModal coords={coords} points={points} show={showSave} setShow={setShowSave}/>
            <Button
                color="primary" 
                leftIcon={<Icon as={Trash2} label="delete" className="w-4 h-4 mr-1"/>}
                onClick={() => setShowDelete(true)}
            >
               Delete 
            </Button>
            <DeleteRouteModal show={showDelete} setShow={setShowDelete} deleteRoute={deleteRoute}/>
        </div>
    )
} 

export default RouteOptions