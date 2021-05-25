import React, { ReactElement, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Conversion from '../atoms/Price/Conversion'
import PriceUnit from '../atoms/Price/PriceUnit'
import Tooltip from '../atoms/Tooltip'
import { stats, total, info } from './MarketStats.module.css'

const getTotalPoolsValues = gql`
  query PoolsData {
    poolFactories {
      totalValueLocked
      totalOceanLiquidity
      finalizedPoolCount
    }
  }
`

export default function MarketStats(): ReactElement {
  const [totalValueLocked, setTotalValueLocked] = useState<string>()
  const [totalOceanLiquidity, setTotalOceanLiquidity] = useState<string>()
  const [poolCount, setPoolCount] = useState<number>()
  const { data } = useQuery(getTotalPoolsValues, { pollInterval: 20000 })

  useEffect(() => {
    if (!data || !data.poolFactories || data.poolFactories.length === 0) return
    setTotalValueLocked(data.poolFactories[0].totalValueLocked)
    setTotalOceanLiquidity(data.poolFactories[0].totalOceanLiquidity)
    setPoolCount(data.poolFactories[0].finalizedPoolCount)
  }, [data])

  return (
    <div className={stats}>
      <Conversion price={`${totalValueLocked}`} hideApproximateSymbol />{' '}
      <abbr title="Total Value Locked">TVL</abbr> across{' '}
      <strong>{poolCount}</strong> data set pools that contain{' '}
      <PriceUnit price={totalOceanLiquidity} small className={total} />, plus
      datatokens for each pool.
      <Tooltip
        className={info}
        content="Counted on-chain from our pool factory. Does not filter out data sets in "
        reference="list-purgatory"
        link="https://github.com/oceanprotocol/list-purgatory"
      />
    </div>
  )
}
