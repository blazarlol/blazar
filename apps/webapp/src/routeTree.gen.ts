/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as OnboardingLayoutImport } from './routes/onboarding/_layout'
import { Route as AuthLayoutImport } from './routes/auth/_layout'
import { Route as OnboardingLayoutSubscriptionPlanImport } from './routes/onboarding/_layout/subscription-plan'
import { Route as OnboardingLayoutAccountInfoImport } from './routes/onboarding/_layout/account-info'
import { Route as AuthLayoutSignImport } from './routes/auth/_layout/_sign'
import { Route as AuthLayoutPasswordResetIndexImport } from './routes/auth/_layout/password-reset/index'
import { Route as AuthLayoutEmailVerificationIndexImport } from './routes/auth/_layout/email-verification/index'
import { Route as AuthLayoutPasswordResetTokenImport } from './routes/auth/_layout/password-reset/$token'
import { Route as AuthLayoutEmailVerificationTokenImport } from './routes/auth/_layout/email-verification/$token'
import { Route as AuthLayoutSignSignupImport } from './routes/auth/_layout/_sign/signup'
import { Route as AuthLayoutSignSigninImport } from './routes/auth/_layout/_sign/signin'

// Create Virtual Routes

const OnboardingImport = createFileRoute('/onboarding')()
const AuthImport = createFileRoute('/auth')()

// Create/Update Routes

const OnboardingRoute = OnboardingImport.update({
  path: '/onboarding',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OnboardingLayoutRoute = OnboardingLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => OnboardingRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any)

const OnboardingLayoutSubscriptionPlanRoute =
  OnboardingLayoutSubscriptionPlanImport.update({
    path: '/subscription-plan',
    getParentRoute: () => OnboardingLayoutRoute,
  } as any)

const OnboardingLayoutAccountInfoRoute =
  OnboardingLayoutAccountInfoImport.update({
    path: '/account-info',
    getParentRoute: () => OnboardingLayoutRoute,
  } as any)

const AuthLayoutSignRoute = AuthLayoutSignImport.update({
  id: '/_sign',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutPasswordResetIndexRoute =
  AuthLayoutPasswordResetIndexImport.update({
    path: '/password-reset/',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

const AuthLayoutEmailVerificationIndexRoute =
  AuthLayoutEmailVerificationIndexImport.update({
    path: '/email-verification/',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

const AuthLayoutPasswordResetTokenRoute =
  AuthLayoutPasswordResetTokenImport.update({
    path: '/password-reset/$token',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

const AuthLayoutEmailVerificationTokenRoute =
  AuthLayoutEmailVerificationTokenImport.update({
    path: '/email-verification/$token',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

const AuthLayoutSignSignupRoute = AuthLayoutSignSignupImport.update({
  path: '/signup',
  getParentRoute: () => AuthLayoutSignRoute,
} as any)

const AuthLayoutSignSigninRoute = AuthLayoutSignSigninImport.update({
  path: '/signin',
  getParentRoute: () => AuthLayoutSignRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_layout': {
      id: '/auth/_layout'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof AuthRoute
    }
    '/onboarding': {
      id: '/onboarding'
      path: '/onboarding'
      fullPath: '/onboarding'
      preLoaderRoute: typeof OnboardingImport
      parentRoute: typeof rootRoute
    }
    '/onboarding/_layout': {
      id: '/onboarding/_layout'
      path: '/onboarding'
      fullPath: '/onboarding'
      preLoaderRoute: typeof OnboardingLayoutImport
      parentRoute: typeof OnboardingRoute
    }
    '/auth/_layout/_sign': {
      id: '/auth/_layout/_sign'
      path: ''
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutSignImport
      parentRoute: typeof AuthLayoutImport
    }
    '/onboarding/_layout/account-info': {
      id: '/onboarding/_layout/account-info'
      path: '/account-info'
      fullPath: '/onboarding/account-info'
      preLoaderRoute: typeof OnboardingLayoutAccountInfoImport
      parentRoute: typeof OnboardingLayoutImport
    }
    '/onboarding/_layout/subscription-plan': {
      id: '/onboarding/_layout/subscription-plan'
      path: '/subscription-plan'
      fullPath: '/onboarding/subscription-plan'
      preLoaderRoute: typeof OnboardingLayoutSubscriptionPlanImport
      parentRoute: typeof OnboardingLayoutImport
    }
    '/auth/_layout/_sign/signin': {
      id: '/auth/_layout/_sign/signin'
      path: '/signin'
      fullPath: '/auth/signin'
      preLoaderRoute: typeof AuthLayoutSignSigninImport
      parentRoute: typeof AuthLayoutSignImport
    }
    '/auth/_layout/_sign/signup': {
      id: '/auth/_layout/_sign/signup'
      path: '/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthLayoutSignSignupImport
      parentRoute: typeof AuthLayoutSignImport
    }
    '/auth/_layout/email-verification/$token': {
      id: '/auth/_layout/email-verification/$token'
      path: '/email-verification/$token'
      fullPath: '/auth/email-verification/$token'
      preLoaderRoute: typeof AuthLayoutEmailVerificationTokenImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/_layout/password-reset/$token': {
      id: '/auth/_layout/password-reset/$token'
      path: '/password-reset/$token'
      fullPath: '/auth/password-reset/$token'
      preLoaderRoute: typeof AuthLayoutPasswordResetTokenImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/_layout/email-verification/': {
      id: '/auth/_layout/email-verification/'
      path: '/email-verification'
      fullPath: '/auth/email-verification'
      preLoaderRoute: typeof AuthLayoutEmailVerificationIndexImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/_layout/password-reset/': {
      id: '/auth/_layout/password-reset/'
      path: '/password-reset'
      fullPath: '/auth/password-reset'
      preLoaderRoute: typeof AuthLayoutPasswordResetIndexImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthLayoutRoute: AuthLayoutRoute.addChildren({
      AuthLayoutSignRoute: AuthLayoutSignRoute.addChildren({
        AuthLayoutSignSigninRoute,
        AuthLayoutSignSignupRoute,
      }),
      AuthLayoutEmailVerificationTokenRoute,
      AuthLayoutPasswordResetTokenRoute,
      AuthLayoutEmailVerificationIndexRoute,
      AuthLayoutPasswordResetIndexRoute,
    }),
  }),
  OnboardingRoute: OnboardingRoute.addChildren({
    OnboardingLayoutRoute: OnboardingLayoutRoute.addChildren({
      OnboardingLayoutAccountInfoRoute,
      OnboardingLayoutSubscriptionPlanRoute,
    }),
  }),
})

/* prettier-ignore-end */
