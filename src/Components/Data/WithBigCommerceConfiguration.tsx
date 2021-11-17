import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    xoConfig: BigCommerceXOConfig;
  }
}

type CustomFacet = {
  attribute: string;
  ui: string;
  sortOrder: number;
};

export type BigCommerceXOConfig = {
  customSortOptions?: {
    label: string;
    attribute: string;
    direction: "asc" | "desc";
    sortOrder: number;
  }[];
  customFacetConfigurations?: CustomFacet[];
};

export type BigCommerceConfigurationProps = {
  bigCommerceConfig: BigCommerceXOConfig;
};

const withBigCommerceConfiguration = <T,>(
  Component: React.ComponentType<T>
) => {
  const WrappedComponent = (props: T) => {
    const [config, setConfig] = useState<BigCommerceXOConfig>();

    document.addEventListener("xobc:config", () => {
      setConfig(window.xoConfig);
    });

    useEffect(() => {
      if (window.xoConfig !== undefined) {
        setConfig(window.xoConfig);
      }
    }, []);

    return <Component bigCommerceConfig={config} {...props}></Component>;
  };

  return WrappedComponent;
};

export default withBigCommerceConfiguration;
