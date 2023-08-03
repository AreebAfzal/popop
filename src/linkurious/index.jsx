import React, { Component, useState } from "react";

import Tooltip from "./tooltip";
import OgmaContainer from "./ogmaComponent";
// import initialGraph from './data'
import initialGraph from "./i2SummitTest";
// import initialGraph from './flight.json'
import "./styles.css";

// import './App.css';

// external helpers
function createNode(id) {
  return {
    id,
    attributes: {
      color: id % 2 ? "purple" : "orange",
    },
  };
}

function createEdge(node, nodesInGraph) {
  // pick a random node in the graph
  const randomIndex = Math.floor(Math.random() * nodesInGraph.length);
  const otherNode = nodesInGraph[randomIndex];
  return {
    id: `${otherNode.id}-${node.id}`,
    source: otherNode.id,
    target: node.id,
  };
}

const LinkuriousChart = () => {
  const [counter, setCounter] = useState(initialGraph.nodes.length);
  const [graph, setGraph] = useState(initialGraph);
  const [layout, setLayout] = useState("force");
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [tooltipNodeId, setTooltipNodeId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addNode = () => {
    const newNode = createNode(counter);
    const nodes = [...graph.nodes, newNode];
    const edges = [...graph.edges, createEdge(newNode, graph.nodes)];

    setGraph({ nodes, edges });
    setCounter((prevCounter) => prevCounter + 1);
  };

  const onLayoutChange = ({ target }) => setLayout(target.value);

  const onNodeUnHover = () => {
    setTooltipPosition(null);
    setTooltipNodeId(null);
  };

  const onNodeHover = ({ x, y, target }) => {
    if (target.isNode) {
      setTooltipPosition({ x, y: y + 20 });
      setTooltipNodeId(target.getId());
    }
  };

  const onclick = () => {
    // alert('Hello');
  };

  const handleTooltip = () => {
    const nodeTooltip = tooltipPosition
      ? graph.nodes.find((node) => node.id === tooltipNodeId)
      : null;

    if (!nodeTooltip) {
      return null;
    }

    return <Tooltip position={tooltipPosition} data={nodeTooltip} />;
  };

  return (
    <>
      {/* <div className="container-fluid bg-dark py-3">
        <div className="row show no-gutters d-flex h-100 position-relative">
          <div className="col px-3 px-md-0">
            <a
              data-bs-toggle="collapse"
              aria-expanded="false"
              data-bs-target=".collapse"
              role="button"
              className="p-1"
              onClick={handleCollapseToggle}
            >
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 h-100">
        <div className="row">
          <div className={`col-md-3 collapse tran ${isCollapsed ? 'show' : ''}`}>
            <div className="navbar-dark bg-dark position-fixed h-100 w-sidebar">
              <h6 className="px-3 pt-3">fixed menu</h6>
              <ul className="nav flex-column flex-nowrap text-truncate">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Active
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    link 1
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    link 2
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <div className="App h-100">
              <OgmaContainer
                data={graph}
                onHover={onNodeHover}
                onUnhover={onNodeUnHover}
                layout={layout}
                onClick={onclick}
              />
              {handleTooltip()}
            </div>
          </div>
        </div>
      </div> */}
      {/* ------------------------------- */}
      <div className="App">
        <OgmaContainer
          data={graph}
          onHover={onNodeHover}
          onUnhover={onNodeUnHover}
          layout={layout}
          onClick={onclick}
        />
        {handleTooltip()}
      </div>
    </>
  );
};

export default LinkuriousChart;
