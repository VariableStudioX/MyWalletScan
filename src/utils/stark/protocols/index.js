import {MySwap} from "./myswap.js";
import {Default} from "./default.js";
import {Avnu} from "./avnu.js";
import {JediSwap} from "./jediswap.js";
import {Swap10k} from "./swap10k.js";
import {SithSwap} from "./sithswap.js";

// export type ProtocolType = "overview" | "mySwap";

export function getProtocolMethod(protocol, key) {
  const handlers = {
    overview: Default,
    myswap: MySwap,
    avnu: Avnu,
    jediswap: JediSwap,
    swap10k: Swap10k,
    sithswap: SithSwap,
  };
  console.log("protocol:", protocol);
  console.log("handlers:", handlers);
  console.log("handlers[protocol]:", handlers[protocol]);
  return handlers[protocol][key];
}
