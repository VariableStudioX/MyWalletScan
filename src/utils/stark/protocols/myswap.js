import {generateGetProtocolsState, getIcon} from "./utils";

const pools = ["0x010884171baf1914edc28d7afb619b40a4051cfae78a094a55d230f19e944a28"];

const basicInfo = {
  name: "mySwap",
  id: "myswap",
  url: "https://myswap.finance/home",
  icon: getIcon("myswap"),
};

export const MySwap = {
  getProtocolsState: generateGetProtocolsState(pools, basicInfo),
  basicInfo,
};
