export const priceFormat = (price) => {
  return price.toFixed(2)
}

export const getStockList = sharesInfoArr => {
  const sharesInfo = sharesInfoArr.map(instrument => {
  return {
    symbol: instrument.symbol,
    name: instrument.name,
    currentPrice: priceFormat(instrument.currentPrice.value),
    closePrice: priceFormat(instrument.priceDetails.closePrice.value),
    highPrice: priceFormat(instrument.priceDetails.highPrice.value),
    lowPrice: priceFormat(instrument.priceDetails.lowPrice.value),
    openPrice: priceFormat(instrument.priceDetails.openPrice.value)
    }
  })

  return sharesInfo
}