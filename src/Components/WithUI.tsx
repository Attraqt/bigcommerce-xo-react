import UIDefinition from "./UI/UIDefinition";

const withUI = (WrappedComponent: any, ui: UIDefinition) => {
  const UIWrappedComponent = (props: any) => {
    return <WrappedComponent ui={ui} {...props}></WrappedComponent>;
  };

  return UIWrappedComponent;
};

export default withUI;
