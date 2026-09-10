import { EventBus } from '../../shared/events/EventBus.ts'
import type { AppEvents } from './AppEvents.ts'

export const eventBus = new EventBus<AppEvents>()
