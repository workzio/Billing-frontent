import React from 'react'
import { BarLoader  } from 'react-spinners'
import { LoadingHolder } from './Styled'

export const LoadingPage = () => {
    return (
        <LoadingHolder>
            <BarLoader 
                color={'#8056F7'}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </LoadingHolder>
    )
}
