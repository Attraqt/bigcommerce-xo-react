import { FacetController, Filter, FilterController, SelectedFacet } from "./Facet";

describe("Components\\Data\\Facet\\FacetController::updateSelected", () => {
  test("Supports the first selected value of a facet", () => {
    let updatedActive: SelectedFacet[] = [];
    const controller = new FacetController({
      active: [],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
    });

    controller.updateSelected({ id: "test" }, "test_value");

    expect(updatedActive).toStrictEqual([
      {
        id: "test",
        values: ["test_value"],
      },
    ]);
  });

  test("Supports adding additional selected values to a facet", () => {
    let updatedActive: SelectedFacet[] = [];
    const controller = new FacetController({
      active: [{ id: "test", values: ["test_value"] }],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      }
    });

    controller.updateSelected({ id: "test" }, "additional_test_value");

    expect(updatedActive).toStrictEqual([
      {
        id: "test",
        values: ["test_value", "additional_test_value"],
      },
    ]);
  });

  test("Supports removing selected values from a facet", () => {
    let updatedActive: SelectedFacet[] = [];
    const controller = new FacetController({
      active: [{ id: "test", values: ["test_value", "additional_test_value"] }],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
    });

    controller.updateSelected({ id: "test" }, "test_value");

    expect(updatedActive).toStrictEqual([
      {
        id: "test",
        values: ["additional_test_value"],
      },
    ]);
  });

  test("Supports removing the final selected values from a facet", () => {
    let updatedActive: SelectedFacet[] = [];
    const controller = new FacetController({
      active: [{ id: "test", values: ["test_value"] }],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
    });

    controller.updateSelected({ id: "test" }, "test_value");

    expect(updatedActive).toStrictEqual([]);
  });
});

describe("Components\\Data\\Facet\\FacetController::isSelected", () => { });

describe("Components\\Data\\Facet\\FilterController::updateSelected", () => {
  test("Supports adding filters", () => {
    let updatedFilter: Filter[] = [];
    const controller = new FilterController({
      filter: [],
      setFilter: (filters: Filter[]) => { updatedFilter = filters; },
    });

    controller.updateSelected("test", "price > 20");

    expect(updatedFilter).toStrictEqual([
      { "id": "test", "filter": "price > 20" }
    ]);
  });

  test("Supports multiple filters", () => {
    let updatedFilter: Filter[] = [];
    const controller = new FilterController({
      filter: [{ "id": "test", "filter": "price > 20" },],
      setFilter: (filters: Filter[]) => { updatedFilter = filters; },
    });

    controller.updateSelected("test2", "something > 20");

    expect(updatedFilter).toStrictEqual([
      { "id": "test", "filter": "price > 20" },
      { "id": "test2", "filter": "something > 20" }
    ]);
  });

  test("Updates existing filters", () => {
    let updatedFilter: Filter[] = [];
    const controller = new FilterController({
      filter: [{ "id": "price", "filter": "price > 20" },],
      setFilter: (filters: Filter[]) => { updatedFilter = filters; },
    });

    controller.updateSelected("price", "price >= 500");

    expect(updatedFilter).toStrictEqual([
      { "id": "price", "filter": "price >= 500" },
    ]);
  });

  test("Doesn't apply blank filters", () => {
    let updatedFilter: Filter[] = [];
    const controller = new FilterController({
      filter: [{ "id": "price", "filter": "price > 20" },],
      setFilter: (filters: Filter[]) => { updatedFilter = filters; },
    });

    controller.updateSelected("price", "     ");

    expect(updatedFilter).toStrictEqual([]);
  });
});