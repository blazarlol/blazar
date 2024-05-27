import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding/_layout/account-info')({
  component: () => <div>Hello /onboarding/_layout/basic-info!</div>
})