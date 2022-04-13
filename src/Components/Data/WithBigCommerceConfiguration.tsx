import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    xoConfig: BigCommerceXOConfig;
  }
}

type CustomFacet = {
  id: string;
  attribute: string;
  ui: string;
  sortOrder: number;
  isFilter: boolean;
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

const withBigCommerceConfiguration = <T,>() => {
  return (
    Component: React.ComponentType<T & BigCommerceConfigurationProps>
  ) => {
    const WrappedWithBigCommerceConfiguration = (props: T) => {
      const [config, setConfig] = useState<BigCommerceXOConfig>({});

      document.addEventListener("xobc:config", () => {
        setConfig(window.xoConfig);
      });

      useEffect(() => {
        if (window.xoConfig !== undefined) {
          setConfig(window.xoConfig);
        }
      }, []);

      return (
        <Component bigCommerceConfig={config} {...(props as T)}></Component>
      );
    };

    return WrappedWithBigCommerceConfiguration;
  };
};

export default withBigCommerceConfiguration;
