export type Item = {
  id: string;
  score: number;
  kind: "product" | "content" | string;
  product?: any;
  redirect?: any;
};

export type ItemGridProps = {
  items: Item[];
  componentMap?: {
    contentCard?: React.FC<ItemHandlerProps>;
    productCard?: React.FC<ItemHandlerProps>;
  };
  isLoading: boolean;
};

export type ItemHandlerProps = {
  item: Item;
  isLoading: boolean;
};
