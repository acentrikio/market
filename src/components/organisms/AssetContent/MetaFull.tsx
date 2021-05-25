import React, { ReactElement } from 'react'
import { useAsset } from '../../../providers/Asset'
import Publisher from '../../atoms/Publisher'
import MetaItem from './MetaItem'
import { metaFull } from './MetaFull.module.css'

export default function MetaFull(): ReactElement {
  const { ddo, metadata, isInPurgatory, type } = useAsset()

  function DockerImage() {
    const algorithmContainer =
      ddo.findServiceByType('metadata').attributes.main.algorithm.container
    const { image } = algorithmContainer
    const { tag } = algorithmContainer
    return <span>{`${image}:${tag}`}</span>
  }

  return (
    <div className={metaFull}>
      {!isInPurgatory && (
        <MetaItem title="Data Author" content={metadata?.main.author} />
      )}
      <MetaItem
        title="Owner"
        content={<Publisher account={ddo?.publicKey[0].owner} />}
      />

      {type === 'algorithm' && (
        <MetaItem title="Docker Image" content={<DockerImage />} />
      )}
      <MetaItem title="DID" content={<code>{ddo?.id}</code>} />
    </div>
  )
}
