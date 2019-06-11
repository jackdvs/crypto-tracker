export const ACTION_SET_COINS: string = "ACTION_SET_COINS";
export const ACTION_POPULATE_TOP_COINS: string = "ACTION_POPULATE_TOP_COINS";

export interface ICoinDispatch {
  setCoins: (payload: any) => void,
  populateTopCoins: () => void,
};

export function setCoins(payload: any) {
  return {
    type: ACTION_SET_COINS,
    payload: {
      coins: payload.coins,
    }
  }
}

export function populateTopCoins() {
  
  // get coins from db here
  const coins: any[] = [];

  return {
    type: ACTION_POPULATE_TOP_COINS,
    payload: {
      coins,
    }
  }
}