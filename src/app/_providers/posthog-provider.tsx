// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import SuspendedPostHogPageView from './pageview-tracker'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
  ui_host: 'https://us.posthog.com',
    capture_pageview: false // Disable automatic pageview capture, as we capture manually
  })
}

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <PostHogProvider client={posthog}>
    <SuspendedPostHogPageView />
    {children}
  </PostHogProvider>
}