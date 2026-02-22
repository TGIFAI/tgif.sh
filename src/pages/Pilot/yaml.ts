import yaml from 'js-yaml'
import type { PilotStore } from './store/PilotStore'
import { DEFAULT_GATEWAY, DEFAULT_LOGGING } from './store/defaults'

function cleanConfig(config: Record<string, string | number>): Record<string, string | number> {
  const result: Record<string, string | number> = {}
  for (const [key, value] of Object.entries(config)) {
    if (value === '' || value === 0) continue
    result[key] = value
  }
  return result
}

export function generateYaml(store: PilotStore): string {
  const config: Record<string, unknown> = {}

  // gateway
  config.gateway = store.useDefaultGeneral
    ? { ...DEFAULT_GATEWAY }
    : { ...store.gateway }

  // logging
  config.logging = store.useDefaultGeneral
    ? { ...DEFAULT_LOGGING }
    : { ...store.logging }

  // providers → map keyed by id
  if (store.providers.length > 0) {
    config.providers = Object.fromEntries(
      store.providers.map((p) => [
        p.id,
        { type: p.type, config: cleanConfig(p.config) },
      ])
    )
  }

  // channels → map keyed by id
  if (store.channels.length > 0) {
    config.channels = Object.fromEntries(
      store.channels.map((c) => [
        c.id,
        {
          type: c.type,
          enabled: c.enabled,
          security: c.security,
          config: cleanConfig(c.config),
        },
      ])
    )
  }

  // agents → map keyed by id
  if (store.agents.length > 0) {
    config.agents = Object.fromEntries(
      store.agents.map((a) => [
        a.id,
        {
          name: a.name,
          workspace: a.workspace,
          channels: a.channels,
          models: {
            primary: a.models.primary,
            ...(a.models.fallback.length > 0 ? { fallback: a.models.fallback } : {}),
          },
          config: a.config,
        },
      ])
    )
  }

  return yaml.dump(config, { lineWidth: 120, noRefs: true })
}
