import ReactDOM from "react-dom";
import Client from "../Attraqt/Client";
import Container from "../Components/UI/Basic/Container";
0;
import withSearch from "../Components/WithSearch";

const api = new Client("60eff59fc82a20b7044bd0e9");
const SearchContainer = withSearch(
  Container,
  api,
  [
    {
      attribute: "title",
      order: "desc",
      label: "Title (Descending)",
    },
    {
      attribute: "title",
      order: "asc",
      label: "Title (Ascending)",
    },
  ],
  {
    query: "to",
  },
  {
    clearItemsOnNewPage: false,
  }
);

ReactDOM.render(<SearchContainer />, document.getElementById("app"));
