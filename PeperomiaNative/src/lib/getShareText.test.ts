import { ItemDetail } from "./db/itemDetail";
import getShareText from "./getShareText";

describe("getShareText", () => {
  test("itemDetails=[]", () => {
    const itemDetails: ItemDetail[] = [];
    expect(getShareText(itemDetails)).toEqual("");
  });

  const getItem = (title: string, moveMinutes?: number) => ({
    itemId: 1,
    title,
    kind: "park",
    moveMinutes: moveMinutes || 0,
    priority: 1,
    memo: ""
  });

  test("itemDetails=[...(4 items)]", () => {
    const itemDetails: ItemDetail[] = [
      getItem("新宿駅", 30),
      getItem("葛西臨海公園"),
      getItem("葛西臨海公園 水上バス", 120),
      getItem("浅草寺二天門前")
    ];
    expect(getShareText(itemDetails)).toEqual(
      "新宿駅 : 30分\n↓\n葛西臨海公園\n↓\n葛西臨海公園 水上バス : 120分\n↓\n浅草寺二天門前"
    );
  });
});
