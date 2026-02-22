import type { GatewayConfig, LoggingConfig } from './types'

export const DEFAULT_GATEWAY: GatewayConfig = {
  bind: '0.0.0.0:8088',
  max_concurrent_sessions: 100,
  request_timeout: 300,
  enable_metrics: false,
  auto_update: false,
}

export const DEFAULT_LOGGING: LoggingConfig = {
  level: 'info',
  format: 'text',
  output: 'both',
  file: 'logs/friday.log',
  max_size: 100,
  max_backups: 5,
  max_age: 30,
}

export interface ProviderFieldDef {
  key: string
  label: string
  type: 'string' | 'number'
  required?: boolean
  placeholder?: string
  defaultValue: string | number
}

export const PROVIDER_FIELDS: Record<string, ProviderFieldDef[]> = {
  openai: [
    { key: 'api_key', label: 'API Key', type: 'string', required: true, placeholder: '${OPENAI_API_KEY}', defaultValue: '' },
    { key: 'base_url', label: 'Base URL', type: 'string', placeholder: 'https://api.openai.com/v1', defaultValue: 'https://api.openai.com/v1' },
    { key: 'default_model', label: 'Default Model', type: 'string', placeholder: 'gpt-5-mini', defaultValue: 'gpt-5-mini' },
    { key: 'timeout', label: 'Timeout (s)', type: 'number', defaultValue: 60 },
    { key: 'max_retries', label: 'Max Retries', type: 'number', defaultValue: 3 },
  ],
  anthropic: [
    { key: 'api_key', label: 'API Key', type: 'string', required: true, placeholder: '${ANTHROPIC_API_KEY}', defaultValue: '' },
    { key: 'base_url', label: 'Base URL', type: 'string', placeholder: 'https://api.anthropic.com', defaultValue: 'https://api.anthropic.com' },
    { key: 'default_model', label: 'Default Model', type: 'string', placeholder: 'claude-sonnet-4-5-20250929', defaultValue: 'claude-sonnet-4-5-20250929' },
    { key: 'max_tokens', label: 'Max Tokens', type: 'number', defaultValue: 4096 },
    { key: 'timeout', label: 'Timeout (s)', type: 'number', defaultValue: 60 },
    { key: 'max_retries', label: 'Max Retries', type: 'number', defaultValue: 3 },
  ],
  gemini: [
    { key: 'api_key', label: 'API Key', type: 'string', required: true, placeholder: '${GEMINI_API_KEY}', defaultValue: '' },
    { key: 'base_url', label: 'Base URL', type: 'string', placeholder: 'https://generativelanguage.googleapis.com', defaultValue: '' },
    { key: 'default_model', label: 'Default Model', type: 'string', placeholder: 'gemini-3-flash-preview', defaultValue: 'gemini-3-flash-preview' },
    { key: 'timeout', label: 'Timeout (s)', type: 'number', defaultValue: 60 },
    { key: 'max_retries', label: 'Max Retries', type: 'number', defaultValue: 3 },
  ],
  ollama: [
    { key: 'base_url', label: 'Base URL', type: 'string', placeholder: 'http://localhost:11434', defaultValue: 'http://localhost:11434' },
    { key: 'default_model', label: 'Default Model', type: 'string', placeholder: 'llama3', defaultValue: 'llama3' },
    { key: 'timeout', label: 'Timeout (s)', type: 'number', defaultValue: 120 },
    { key: 'max_retries', label: 'Max Retries', type: 'number', defaultValue: 3 },
  ],
  qwen: [
    { key: 'api_key', label: 'API Key', type: 'string', required: true, placeholder: '${QWEN_API_KEY}', defaultValue: '' },
    { key: 'base_url', label: 'Base URL', type: 'string', placeholder: 'https://dashscope.aliyuncs.com/compatible-mode/v1', defaultValue: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
    { key: 'default_model', label: 'Default Model', type: 'string', placeholder: 'qwen-plus', defaultValue: 'qwen-plus' },
    { key: 'timeout', label: 'Timeout (s)', type: 'number', defaultValue: 60 },
    { key: 'max_retries', label: 'Max Retries', type: 'number', defaultValue: 3 },
  ],
}

export interface ChannelFieldDef {
  key: string
  label: string
  type: 'string' | 'number' | 'select'
  required?: boolean
  placeholder?: string
  defaultValue: string | number
  options?: string[]
}

export const CHANNEL_FIELDS: Record<string, ChannelFieldDef[]> = {
  telegram: [
    { key: 'token', label: 'Bot Token', type: 'string', required: true, placeholder: '${TELEGRAM_BOT_TOKEN}', defaultValue: '' },
    { key: 'poll_timeout', label: 'Poll Timeout (s)', type: 'number', defaultValue: 30 },
    { key: 'max_workers', label: 'Max Workers', type: 'number', defaultValue: 5 },
  ],
  lark: [
    { key: 'app_id', label: 'App ID', type: 'string', required: true, placeholder: '${LARK_APP_ID}', defaultValue: '' },
    { key: 'app_secret', label: 'App Secret', type: 'string', required: true, placeholder: '${LARK_APP_SECRET}', defaultValue: '' },
    { key: 'verification_token', label: 'Verification Token', type: 'string', required: true, placeholder: '${LARK_VERIFICATION_TOKEN}', defaultValue: '' },
    { key: 'encrypt_key', label: 'Encrypt Key', type: 'string', placeholder: '${LARK_ENCRYPT_KEY}', defaultValue: '' },
    { key: 'mode', label: 'Mode', type: 'select', defaultValue: 'WS', options: ['WS', 'WEBHOOK'] },
  ],
  http: [
    { key: 'api_key', label: 'API Key', type: 'string', placeholder: '${HTTP_API_KEY}', defaultValue: '' },
  ],
}

export function buildDefaultProviderConfig(type: string): Record<string, string | number> {
  const fields = PROVIDER_FIELDS[type] ?? []
  const config: Record<string, string | number> = {}
  for (const f of fields) {
    config[f.key] = f.defaultValue
  }
  return config
}

export function buildDefaultChannelConfig(type: string): Record<string, string | number> {
  const fields = CHANNEL_FIELDS[type] ?? []
  const config: Record<string, string | number> = {}
  for (const f of fields) {
    config[f.key] = f.defaultValue
  }
  return config
}

export const DEFAULT_CHANNEL_SECURITY = {
  policy: 'welcome' as const,
  welcome_window: 300,
  max_resp: 5,
  custom_text: '',
}

export const DEFAULT_AGENT_RUNTIME = {
  max_iterations: 25,
  max_tokens: 4096,
  temperature: 0.7,
}
