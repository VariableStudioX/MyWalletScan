import {useEffect, useState} from "react";
import list from "../../../address.js";
import {sleep} from "@/utils/stark/utils";
import {dataTransform} from "@/utils/stark/protocols/utils.js";
import {getProtocolMethod} from "@/utils/stark/protocols/index.js";
import getTransactions from "@utils/stark/getTransactions";
import {Radio, Tabs} from "antd";

import Chart from "../../../components/Chart/index.jsx";

const search = window.location.search;
const params = new URLSearchParams(search);
const addresslist = params.get("addresslist");

let addresss = [];
if (!addresslist) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addresss = list.gkk_starknet;
}

if (addresslist === "wwx_starknet") {
  addresss = list.wwx_starknet;
}

if (addresslist === "gkk_starknet") {
  addresss = list.gkk_starknet;
}

const AddressListPage = () => {
  const [transactionDataList, setTransactionDataList] = useState([]);
  useEffect(() => {
    fetchTransactionList(addresss);
  }, []);

  // 并行改串行
  const fetchTransactionList = async (adds) => {
    const transactionDataList = [];
    for (const ad of adds) {
      const {transactions} = await getTransactions(ad);
      await sleep(200);
      const transactionData = dataTransform(ad, transactions, adds.indexOf(ad));
      transactionDataList.push(transactionData);
    }
    setTransactionDataList(transactionDataList);
  };

  const items = itemOptios.map((item) => {
    const basicInfo = getProtocolMethod(item.key, "basicInfo");
    return {
      label: (
        <div className="flex flex-row items-center ">
          <img
            className={"w-4 h-4 rounded-full mr-2 "}
            src={basicInfo.icon}
            alt=""
            // onClick={() => {
            //   window.open(item.url, '_blank');
            // }}
          />
          <div className=" mr-2 w-20 text-ellipsis overflow-hidden text-left"> {item.label}</div>
        </div>
      ),
      key: item.key,
      children: <Chart transactionDataList={transactionDataList} protocol={item.key} />,
    };
  });
  return (
    <>
      <div className="mt-10 place-items-center mb-20 ml-10 mr-10">
        <Tabs defaultActiveKey="1" tabPosition="left" style={{height: 700}} items={items} />
      </div>
    </>
  );
};

export default AddressListPage;

const itemOptios = [
  {
    label: "概览",
    key: "overview",
  },
  {
    label: "mySwap",
    key: "myswap",
  },
  {
    label: "10kSwap",
    key: "swap10k",
  },
  {
    label: "jediSwap",
    key: "jediswap",
  },
  {
    label: "Avnu",
    key: "avnu",
  },
  {
    label: "sithSwap",
    key: "sithswap",
  },
];
