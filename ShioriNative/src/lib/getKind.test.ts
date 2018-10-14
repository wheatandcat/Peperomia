import getKind, {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_DEFAULT
} from "./getKind";

test("getKind", () => {
  expect(getKind("葛西臨海公園")).toEqual(KIND_PARK);
  expect(getKind("葛西臨海公園 水上バス")).toEqual(KIND_SHIP);
  expect(getKind("新宿駅")).toEqual(KIND_TRAIN);
  expect(getKind("浅草")).toEqual(KIND_DEFAULT);
});
