import getVol from "@utils/stark/getVol.js";
export const dataTransform = (address, transactions, index) => {
  const orginTransactions = [...transactions];

  let interactions = 0;
  let interactionsChange = 0;

  let fees = 0;
  let feesChange = 0;

  let volume = 0;
  let volumeChange = 0;

  transactions.forEach((transaction) => {
    // interactions
    if (transaction.initiator_address.toLowerCase() === address.toLowerCase()) {
      interactions = interactions + 1;
      if (new Date(transaction.timestamp).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
        interactionsChange = interactionsChange + 1;
      }
    }

    // volume
    const transfers = transaction.transfers.sort((a, b) => parseInt(b.total_value) - parseInt(a.total_value));
    // if (transfers.length === 0) return;
    // const tmpVol = parseFloat(transfers[0].total_value)
    //   const transfers = transaction.transfers.sort(
    //     (a, b) => parseInt(b.amount) * 10 ** -b.token.decimals * b.token.price - parseInt(a.amount) * 10 ** -a.token.decimals * a.token.price
    //   );
    // Vol += tmpVol;
    if (transfers.length === 0) return;
    const tmpVolume = parseFloat(transfers[0].total_value);
    volume = volume + tmpVolume;
    if (new Date(transaction.timestamp).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
      volumeChange = volumeChange + tmpVolume;
    }

    // fee
    const tmpFees = parseFloat(transaction["actual_fee_display"]);
    fees = fees + tmpFees;
    if (new Date(transaction.receivedAt).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
      feesChange = feesChange + tmpFees;
    }
  });

  return {
    transactions: orginTransactions,
    interactions,
    interactions7Change: interactionsChange,
    volume,
    volume7Change: volumeChange,
    fees,
    fees7Change: feesChange,
    index,
    address,
  };
};

export function getIcon(id) {
  return `/protocol/${id}.png`;
}

export const isSpeciContractTransction = (transactions, pools = []) => {
  const {transfers = []} = transactions;
  const lastTransfer = transfers.reverse()[0];
  let flag = false;
  if (!transfers.length) {
    return flag;
  }
  for (let i = 0; i < transfers.length; i++) {
    const transfer = transfers[i];
    if (pools.includes(lastTransfer.transfer_to_address.toLowerCase()) || pools.includes(lastTransfer.transfer_from_address.toLowerCase())) {
      flag = true;
      break;
    }
  }

  return flag;
};

// function getVol(transcations) {
//   try {
//     let Vol = 0;
//     transcations.forEach((transaction) => {
//       const transfers = transaction.transfers.sort((a, b) => parseInt(b.total_value) - parseInt(a.total_value));
//       if (transfers.length === 0) return;
//       const tmpVol = parseFloat(transfers[0].total_value);
//       Vol += tmpVol;
//     });
//     return {Vol: Vol.toFixed(3)};
//   } catch (e) {
//     console.log(e);
//     return {Vol: "-"};
//   }
// }

export function generateGetProtocolsState(pools, basicInfo) {
  return (transactions, address) => {
    const protocolState = {
      ...basicInfo,
      volume: 0,
      interactions: 0,
      lastActivity: "",
      activeDays: 0,
    };
    transactions.forEach((transaction) => {
      if (isSpeciContractTransction(transaction, pools)) {
        protocolState.interactions += 1;
        const {transfers} = transaction;
        if (transfers.length === 0) return;
        protocolState.volume += Number(getVol([transaction]).Vol);
      }
    });
    // transactions.forEach((transaction) => {
    //   if (pools.includes(transaction.to.toLowerCase())) {
    //     if (protocolState.lastActivity === "") protocolState.lastActivity = transaction.receivedAt;
    //     if (new Date(protocolState.lastActivity) < new Date(transaction.receivedAt)) protocolState.lastActivity = transaction.receivedAt;
    //     protocolState.interactions += 1;

    //     const transfers = transaction.transfers.sort(
    //       (a, b) => parseInt(b.amount) * 10 ** -b.token.decimals * b.token.price - parseInt(a.amount) * 10 ** -a.token.decimals * a.token.price
    //     );

    //     if (transfers.length === 0) return;
    //     protocolState.volume += parseInt(transfers[0].amount) * 10 ** -transfers[0].token.decimals * transfers[0].token.price;
    //   }
    // });

    // protocolState.activeDays = countTransactionPeriods(address, transactions, protocolState.id, pools).days;
    return protocolState;
  };
}
