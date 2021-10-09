export type Item = {
  id: string;
  score: number;
  kind: "product" | "content" | string;
  product?: any;
  redirect?: any;
};

export type ItemGridProps = {
  items: Item[];
};

export type ItemHandlerProps = {
  item: Item;
};
