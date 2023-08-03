import React, { useEffect, useRef } from 'react';
import Ogma from 'ogma/umd';

const OgmaComponent = ({ data, layout, ...props }) => {
  const ogmaRef = useRef(null);

  useEffect(() => {
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    };
    
    // Check if WebGL is available
    if (!isWebGLAvailable()) {
      console.error('WebGL is not available in this browser or environment.');
      // Render a fallback UI or display an error message
    }


    // create the Ogma instance if the container element exists
    const container = document.getElementById('ogma-react');
    if (!container) return;

    ogmaRef.current = new Ogma({
      container,
      // renderer: 'svg',
      options: {
        backgroundColor: 'rgb(240, 240, 240)',
      },
      graph: data,
    });
    
    ogmaRef.current.layouts.force({ locate: true });
    ogmaRef.current.styles.addNodeRule({
      text: (node) => node.getData('name'),
    });

    bindEvents();

    return () => {
      ogmaRef.current.destroy();
    };
  }, [data]);

  useEffect(() => {
    if (!ogmaRef.current || layout !== 'hierarchical') return;

    const options = {
      locate: true,
      roots: [1], // set node with ID = 1 as root of the hierarchy
    };

    ogmaRef.current.layouts[layout](options);
  }, [layout]);

  useEffect(() => {
    if (!ogmaRef.current || props.layout !== layout) {
      runLayout();
    }
  }, [props.layout]);

  const runLayout = () => {
    if (!ogmaRef.current) return;

    const options = { locate: true };

    if (layout === 'hierarchical') {
      options.roots = [1];
    }

    ogmaRef.current.layouts[layout](options);
  };

  const bindEvents = () => {
    if (!ogmaRef.current) return;

    Object.keys(props).forEach((prop) => {
      if (/^on/.test(prop) && prop in ogmaRef.current.events) {
        ogmaRef.current.events[prop](props[prop]);
      }
    });
  };

  return <div id="ogma-react" style={{ width: "500px", height: "500px" }}></div>;
};

export default OgmaComponent;
