/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as AuthLayoutImport } from './routes/auth/_layout'
import { Route as AuthLayoutSignupImport } from './routes/auth/_layout/signup'
import { Route as AuthLayoutSigninImport } from './routes/auth/_layout/signin'
import { Route as AuthLayoutPasswordResetIndexImport } from './routes/auth/_layout/password-reset/index'
import { Route as AuthLayoutEmailVerificationIndexImport } from './routes/auth/_layout/email-verification/index'
import { Route as AuthLayoutPasswordResetTokenImport } from './routes/auth/_layout/password-reset/$token'
import { Route as AuthLayoutEmailVerificationTokenImport } from './routes/auth/_layout/email-verification/$token'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLayoutSignupRoute = AuthLayoutSignupImport.update({
  path: '/signup',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutSigninRoute = AuthLayoutSigninImport.update({
  path: '/signin',
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
    '/auth/_layout/signin': {
      id: '/auth/_layout/signin'
      path: '/signin'
      fullPath: '/auth/signin'
      preLoaderRoute: typeof AuthLayoutSigninImport
      parentRoute: typeof AuthLayoutImport
    }
    '/auth/_layout/signup': {
      id: '/auth/_layout/signup'
      path: '/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthLayoutSignupImport
      parentRoute: typeof AuthLayoutImport
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
      AuthLayoutSigninRoute,
      AuthLayoutSignupRoute,
      AuthLayoutEmailVerificationTokenRoute,
      AuthLayoutPasswordResetTokenRoute,
      AuthLayoutEmailVerificationIndexRoute,
      AuthLayoutPasswordResetIndexRoute,
    }),
  }),
})

/* prettier-ignore-end */
