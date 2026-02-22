export interface GatewayConfig {
  bind: string
  max_concurrent_sessions: number
  request_timeout: number
  enable_metrics: boolean
  auto_update: boolean
}

export interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error'
  format: 'json' | 'text'
  output: 'stdout' | 'file' | 'both'
  file: string
  max_size: number
  max_backups: number
  max_age: number
}

export interface ProviderEntry {
  id: string
  type: 'openai' | 'anthropic' | 'gemini' | 'ollama' | 'qwen'
  config: Record<string, string | number>
}

export interface ChannelSecurityConfig {
  policy: 'welcome' | 'silent' | 'custom'
  welcome_window: number
  max_resp: number
  custom_text: string
}

export interface ChannelEntry {
  id: string
  type: 'telegram' | 'lark' | 'http'
  enabled: boolean
  security: ChannelSecurityConfig
  config: Record<string, string | number>
}

export interface ModelsConfig {
  primary: string
  fallback: string[]
}

export interface AgentRuntimeConfig {
  max_iterations: number
  max_tokens: number
  temperature: number
}

export interface AgentEntry {
  id: string
  name: string
  workspace: string
  channels: string[]
  models: ModelsConfig
  config: AgentRuntimeConfig
}
