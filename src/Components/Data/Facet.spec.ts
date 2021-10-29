import { FacetController, SelectedFacet } from "./Facet";

describe("Components\\Data\\Facet\\FacetController::updateSelected", () => {
  test("Supports the first selected value of a facet", () => {
    let updatedActive: SelectedFacet[] = [];
    const controller = new FacetController({
      active: [],
      available: [
        {
          id: "test",
          title: "test",
          values: [
            {
              value: "test_value",
              count: 0,
            },
          ],
        },
      ],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
      isLoading: false,
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
      available: [
        {
          id: "test",
          title: "test",
          values: [
            {
              value: "test_value",
              count: 0,
            },
            {
              value: "additional_test_value",
              count: 0,
            },
          ],
        },
      ],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
      isLoading: false,
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
      available: [
        {
          id: "test",
          title: "test",
          values: [
            {
              value: "test_value",
              count: 0,
            },
            {
              value: "additional_test_value",
              count: 0,
            },
          ],
        },
      ],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
      isLoading: false,
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
      available: [
        {
          id: "test",
          title: "test",
          values: [
            {
              value: "test_value",
              count: 0,
            },
            {
              value: "additional_test_value",
              count: 0,
            },
          ],
        },
      ],
      setActive: (active: SelectedFacet[]) => {
        updatedActive = active;
      },
      isLoading: false,
    });

    controller.updateSelected({ id: "test" }, "test_value");

    expect(updatedActive).toStrictEqual([]);
  });
});
describe("Components\\Data\\Facet\\FacetController::isSelected", () => {});
