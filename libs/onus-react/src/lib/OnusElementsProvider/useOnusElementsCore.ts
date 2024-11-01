import { useContext } from 'react'
import { OnusElementsContext } from './OnusElementsProvider'
import type { OnusCoreType } from '@onus-elements/core'

const useOnusElementsCore = (): OnusCoreType | null => {
  const contextValue = useContext(OnusElementsContext)
  return contextValue.core
}

export default useOnusElementsCore
