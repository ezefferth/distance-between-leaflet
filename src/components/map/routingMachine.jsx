import * as L from 'leaflet';
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


import { useData } from '../context/context'



const createRoutineMachineLayer = (props) => {

  //dotenv.config(); dont need this fow while
  /* const options = { profile: "mapbox/walking", polylinePrecision: 6 }; */
  const options = { profile: 'mapbox/walking' };

  /* deixe somente process.env.MAPBOX_TOKEN e veja o erro
   vc pode forçar, colocando !
  mas é bom colocar algum valor alternativo,  ?? ''
  */
  //const token: string = process.env.MAPBOX_TOKEN ?? ''

  const token = process.env.MAPBOX_TOKEN;

  //rotas que vem de context
  const { setRoutes, setRoutes2 } = useData();

  /* oque vem das props, os dados de lat,lng start e end points */
  const { waypoints } = props;
  const instance = L.Routing.control({
    waypoints,
    lineOptions: {
      /* cor e largura da line */
      styles: [{ color: "#6FA1EC", weight: 4 }],
      //extendToWaypoints: false,
      //missingRouteTolerance: 0,
    },
    show: false,
    //addWaypoints: false,
    //routeWhileDragging: true,
    //draggableWaypoints: true,
    //scrollWheelZoom: false,
    //fitSelectedRoutes: true,
    //showAlternatives: false,

    router: L.Routing.mapbox(token, options)
  });

  instance.on('routesfound', function (e) {
    const routes = e.routes;

    setRoutes2(routes);
    setRoutes(routes[0].summary);

  });
  //instance.hide();

  return instance;


};
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;