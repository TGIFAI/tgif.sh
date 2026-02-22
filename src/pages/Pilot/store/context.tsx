import { createContext, useContext, useState, type ReactNode } from 'react'
import { PilotStore } from './PilotStore'

const PilotContext = createContext<PilotStore | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function usePilotStore(): PilotStore {
  const store = useContext(PilotContext)
  if (!store) throw new Error('usePilotStore must be used within PilotProvider')
  return store
}

export function PilotProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => new PilotStore())
  return <PilotContext.Provider value={store}>{children}</PilotContext.Provider>
}
