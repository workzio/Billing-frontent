import React from 'react'
import { Headbox } from './Partials/Headbox'
import { Mainbox } from './Partials/MainBox'
import { ContainerWrapper } from './Partials/Styled'

const MainLayout = ({ headBox, secondbox }) => {
  return (

    <ContainerWrapper>
        <Headbox headBox={headBox} />
        <Mainbox secondbox={secondbox} />
    </ContainerWrapper>
  )
}

export default MainLayout     