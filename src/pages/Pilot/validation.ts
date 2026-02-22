import type { PilotStore } from './store/PilotStore'
import { PROVIDER_FIELDS, CHANNEL_FIELDS } from './store/defaults'

export function validateStep(store: PilotStore, step: number): string[] {
  const errors: string[] = []

  switch (step) {
    case 0: {
      if (!store.useDefaultGeneral) {
        if (!store.gateway.bind.trim()) {
          errors.push('Gateway bind address is required')
        }
      }
      break
    }

    case 1: {
      if (store.providers.length === 0) {
        errors.push('Add at least one provider')
        break
      }
      for (const p of store.providers) {
        if (!p.id.trim()) {
          errors.push('Each provider must have an ID')
        }
        const fields = PROVIDER_FIELDS[p.type] ?? []
        for (const f of fields) {
          if (f.required && !p.config[f.key]) {
            errors.push(`Provider "${p.id}": ${f.label} is required`)
          }
        }
      }
      // check duplicate IDs
      const pIds = store.providers.map((p) => p.id)
      if (new Set(pIds).size !== pIds.length) {
        errors.push('Provider IDs must be unique')
      }
      break
    }

    case 2: {
      if (store.channels.length === 0) {
        errors.push('Add at least one channel')
        break
      }
      for (const c of store.channels) {
        if (!c.id.trim()) {
          errors.push('Each channel must have an ID')
        }
        const fields = CHANNEL_FIELDS[c.type] ?? []
        for (const f of fields) {
          if (f.required && !c.config[f.key]) {
            errors.push(`Channel "${c.id}": ${f.label} is required`)
          }
        }
      }
      const cIds = store.channels.map((c) => c.id)
      if (new Set(cIds).size !== cIds.length) {
        errors.push('Channel IDs must be unique')
      }
      break
    }

    case 3: {
      if (store.agents.length === 0) {
        errors.push('Add at least one agent')
        break
      }
      for (const a of store.agents) {
        if (!a.id.trim()) {
          errors.push('Each agent must have an ID')
        }
        if (!a.name.trim()) {
          errors.push(`Agent "${a.id}": Name is required`)
        }
        if (!a.workspace.trim()) {
          errors.push(`Agent "${a.id}": Workspace is required`)
        }
        if (!a.models.primary) {
          errors.push(`Agent "${a.id}": Primary model is required`)
        }
      }
      const aIds = store.agents.map((a) => a.id)
      if (new Set(aIds).size !== aIds.length) {
        errors.push('Agent IDs must be unique')
      }
      break
    }

    // Step 4 (Review): no validation
  }

  return errors
}
