import { useContext } from 'react'
import Context from './Context'
import type { OnusCoreType } from '@onus-elements/core'

const useOnusElementsCore = (): OnusCoreType | null => {
  const contextValue = useContext(Context)
  return contextValue.core
}

export default useOnusElementsCore
