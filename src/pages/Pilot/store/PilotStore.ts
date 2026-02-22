import { makeAutoObservable, computed } from 'mobx'
import type {
  GatewayConfig,
  LoggingConfig,
  ProviderEntry,
  ChannelEntry,
  AgentEntry,
} from './types'
import {
  DEFAULT_GATEWAY,
  DEFAULT_LOGGING,
  DEFAULT_CHANNEL_SECURITY,
  DEFAULT_AGENT_RUNTIME,
  buildDefaultProviderConfig,
  buildDefaultChannelConfig,
} from './defaults'
import { generateYaml } from '../yaml'

let idCounter = 0
function nextId(prefix: string) {
  return `${prefix}-${++idCounter}`
}

export class PilotStore {
  currentStep = 0

  // Step 1: General
  useDefaultGeneral = true
  gateway: GatewayConfig = { ...DEFAULT_GATEWAY }
  logging: LoggingConfig = { ...DEFAULT_LOGGING }

  // Step 2-4: Dynamic lists
  providers: ProviderEntry[] = []
  channels: ChannelEntry[] = []
  agents: AgentEntry[] = []

  constructor() {
    makeAutoObservable(this, {
      providerModelOptions: computed,
      channelIdOptions: computed,
      yamlOutput: computed,
    })
  }

  // --- Computed ---
  get providerModelOptions(): { value: string; label: string }[] {
    return this.providers.map((p) => {
      const model = p.config.default_model || 'default'
      const value = `${p.id}:${model}`
      return { value, label: `${p.id} : ${model}` }
    })
  }

  get channelIdOptions(): { value: string; label: string }[] {
    return this.channels.map((c) => ({
      value: c.id,
      label: `${c.id} (${c.type})`,
    }))
  }

  get yamlOutput(): string {
    return generateYaml(this)
  }

  // --- Step navigation ---
  setStep(n: number) {
    this.currentStep = n
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--
    }
  }

  // --- General ---
  setUseDefaultGeneral(v: boolean) {
    this.useDefaultGeneral = v
    if (v) {
      this.gateway = { ...DEFAULT_GATEWAY }
      this.logging = { ...DEFAULT_LOGGING }
    }
  }

  updateGateway(partial: Partial<GatewayConfig>) {
    Object.assign(this.gateway, partial)
  }

  updateLogging(partial: Partial<LoggingConfig>) {
    Object.assign(this.logging, partial)
  }

  // --- Providers ---
  addProvider() {
    this.providers.push({
      id: nextId('provider'),
      type: 'openai',
      config: buildDefaultProviderConfig('openai'),
    })
  }

  removeProvider(index: number) {
    this.providers.splice(index, 1)
  }

  updateProvider(index: number, partial: Partial<ProviderEntry>) {
    const provider = this.providers[index]
    if (!provider) return
    if (partial.type && partial.type !== provider.type) {
      provider.type = partial.type
      provider.config = buildDefaultProviderConfig(partial.type)
    }
    if (partial.id !== undefined) provider.id = partial.id
  }

  updateProviderConfig(index: number, key: string, value: string | number) {
    const provider = this.providers[index]
    if (!provider) return
    provider.config[key] = value
  }

  // --- Channels ---
  addChannel() {
    this.channels.push({
      id: nextId('channel'),
      type: 'telegram',
      enabled: true,
      security: { ...DEFAULT_CHANNEL_SECURITY },
      config: buildDefaultChannelConfig('telegram'),
    })
  }

  removeChannel(index: number) {
    this.channels.splice(index, 1)
  }

  updateChannel(index: number, partial: Partial<ChannelEntry>) {
    const channel = this.channels[index]
    if (!channel) return
    if (partial.type && partial.type !== channel.type) {
      channel.type = partial.type
      channel.config = buildDefaultChannelConfig(partial.type)
    }
    if (partial.id !== undefined) channel.id = partial.id
    if (partial.enabled !== undefined) channel.enabled = partial.enabled
    if (partial.security) Object.assign(channel.security, partial.security)
  }

  updateChannelConfig(index: number, key: string, value: string | number) {
    const channel = this.channels[index]
    if (!channel) return
    channel.config[key] = value
  }

  // --- Agents ---
  addAgent() {
    this.agents.push({
      id: nextId('agent'),
      name: '',
      workspace: 'workspace',
      channels: [],
      models: { primary: '', fallback: [] },
      config: { ...DEFAULT_AGENT_RUNTIME },
    })
  }

  removeAgent(index: number) {
    this.agents.splice(index, 1)
  }

  updateAgent(index: number, partial: Partial<AgentEntry>) {
    const agent = this.agents[index]
    if (!agent) return
    if (partial.id !== undefined) agent.id = partial.id
    if (partial.name !== undefined) agent.name = partial.name
    if (partial.workspace !== undefined) agent.workspace = partial.workspace
    if (partial.channels !== undefined) agent.channels = partial.channels
    if (partial.models) Object.assign(agent.models, partial.models)
    if (partial.config) Object.assign(agent.config, partial.config)
  }
}
