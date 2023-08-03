import { Layout, Model } from "flexlayout-react";
import "./style.css";
import "flexlayout-react/style/light.css";
import CompassSvg from "./compass";
import LinkuriousChart from "./linkurious";


const dockConfigCase = {
  global: {
    tabEnableFloat: true
  },
  borders: [],
  layout: {
    type: "row",
    id: "#5be3c7cdd-7f77-468e-83fe-673e7160a975",
    children: [
      
          {
            type: "tabset",
            id: "#a6628dc5-c01f-4437a-b257-0de10b057ca2",
            weight: 51.592689295039165,
            children: [
              {
                type: "tab",
                id: "#305b667f-cf133-455a-a805-bf3b549cce57",
                name: "Cases",
                component: "cases"
              }
            ],
            
          },
          
      {
        type: "row",
        id: "#f0c5015d-1457-402b-b315-e61ffb1db72b",
        weight: 52,
        children: [
          {
            type: "tabset",
            id: "#a6628dc5-c01f-447a-b257-0de10b057ca2",
            weight: 51.592689295039165,
            children: [
              {
                type: "tab",
                id: "#305b667f-cf13-455a-a805-bf3b549cce57",
                name: "Areeb",
                component: "areeb"
              }
            ],
            active: true
          }
        ]
      }
    ]
  }
};


const model = Model.fromJson(dockConfigCase);

function App() {
  const factory = (node) => {
    var component = node.getComponent();
    if (component === "cases") {
      // return "awais";
      return <CompassSvg />;
    }

    if (component === "areeb") {
      // return "areeb";
      return <LinkuriousChart />;
    }
  };

  return <Layout model={model} factory={factory} />;
}

export default App;