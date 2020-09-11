import { constants } from '../constants'

const saveState = state => {
  localStorage.setItem(constants.STORAGE_KEY, JSON.stringify(state))
}

const loadState = () => {
  const json = localStorage.getItem(constants.STORAGE_KEY)
  return json ? JSON.parse(json) : undefined
}

const calculateChangedPrice = (currentPrice, storedStockInfo) => {
  if (storedStockInfo.length <= 0 ) return '0.00'
  return priceFormat(storedStockInfo[0].currentPrice.value - currentPrice)
}

export const priceFormat = (price) => {
  return price.toFixed(2)
}

export const getStockList = sharesInfoArr => {
  const getStoredInstruments = loadState()

  const sharesInfo = sharesInfoArr.map(instrument => {
  const getMatchedInstrument = getStoredInstruments.filter(storedStock => storedStock.symbol === instrument.symbol)
  const changedPrice = calculateChangedPrice(instrument.currentPrice.value, getMatchedInstrument)
  const changeArrow = Math.sign(changedPrice) === 0 ? '' : Math.sign(changedPrice) < 0 ? '↓' : '↑'
  const className = Math.sign(changedPrice) === 0 ? '' : Math.sign(changedPrice) < 0 ? 'price-down' : 'price-up'  
  const changedPrefix = Math.sign(changedPrice) === 0 ? '' : Math.sign(changedPrice) < 0 ? '' : '+'
  return {
    symbol: instrument.symbol,
    name: instrument.name,
    currentPrice: `${priceFormat(instrument.currentPrice.value)} ${changeArrow}` ,
    change: changedPrefix + changedPrice,
    className: className,
    closePrice: priceFormat(instrument.priceDetails.closePrice.value),
    highPrice: priceFormat(instrument.priceDetails.highPrice.value),
    lowPrice: priceFormat(instrument.priceDetails.lowPrice.value),
    openPrice: priceFormat(instrument.priceDetails.openPrice.value)
    }
  })

  saveState(sharesInfoArr)
  return sharesInfo
}