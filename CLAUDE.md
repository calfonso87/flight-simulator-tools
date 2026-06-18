# FlightSim Tools — Developer Reference

## Development Commands

```bash
pnpm start              # Expo dev server (choose platform interactively)
pnpm run web            # open in browser
pnpm run android        # run on Android emulator
pnpm run ios            # run on iOS simulator
pnpm run typecheck      # tsc --noEmit
pnpm run lint           # eslint src app --ext .ts,.tsx
npx expo start --web --clear  # clear Metro cache
```

## Architecture

Clean Architecture with strict one-way dependency rule: outer layers may import inner, never the reverse.

```
Domain        src/domain/          pure TypeScript, zero external deps
Infrastructure src/infrastructure/ Axios client, AsyncStorage repositories
Application   src/application/     Zustand stores, custom hooks, DI container
Presentation  src/presentation/    Atomic Design components, auth guards, pages
```

Entry points are thin Expo Router files in `app/` that import from `src/presentation/pages/`.

## Path Aliases

Configured in both `tsconfig.json` and `babel.config.js` (via `babel-plugin-module-resolver`):


| Alias       | Resolves to            |
| ----------- | ---------------------- |
| `@domain/*` | `src/domain/*`         |
| `@infra/*`  | `src/infrastructure/*` |
| `@app/*`    | `src/application/*`    |
| `@ui/*`     | `src/presentation/*`   |
| `@/*`       | `src/*`                |
| `@assets/*` | `assets/*`             |

## Routing (Expo Router v3, file-based)

```
app/_layout.tsx                          # root: imports global.css FIRST, loads fonts, AuthProvider
app/(auth)/login.tsx                     # public login screen
app/(app)/_layout.tsx                    # tab navigator, redirects to login if no user
app/(app)/index.tsx                      # home screen
app/(app)/tools/index.tsx                # tools list
app/(app)/tools/descent-calculator.tsx   # calculator screen
```

## Styling — NativeWind v4 + Tailwind CSS v3

**Critical rules:**

1. `import "../global.css"` must be the **first import** in `app/_layout.tsx`
2. No `postcss.config.js` — NativeWind uses `withNativeWind` in `metro.config.js` instead
3. Use `contentContainerStyle` (not `contentContainerClassName`) on `ScrollView`
4. Do NOT upgrade `tailwindcss` to v4 — NativeWind v4 only supports Tailwind v3

**Custom aviation colors** (`tailwind.config.js`):


| Token           | Hex       |
| --------------- | --------- |
| `sky-950`       | `#0a0f1e` |
| `sky-900`       | `#0d1526` |
| `sky-800`       | `#131e38` |
| `sky-700`       | `#1a2847` |
| `cockpit-green` | `#00ff88` |
| `cockpit-amber` | `#ffb347` |
| `cockpit-red`   | `#ff4444` |
| `cockpit-blue`  | `#4da6ff` |
| `cockpit-white` | `#e8f4fd` |

**Font classes:** `font-sans` (Inter 400), `font-sans-medium` (Inter 500), `font-sans-bold` (Inter 700), `font-mono` (SpaceMono 400)

## Auth & Role System

- Default: `GUEST_USER` in `src/application/stores/authStore.ts` — `role: "guest"`, permissions: `["tools:read", "calculator:use"]`
- **Roles:** `"pilot" | "instructor" | "admin" | "guest"`
- **Permissions:** `"tools:read" | "calculator:use" | "tools:write" | "users:manage" | "admin:access"`
- Declarative guards in presentation layer:
  ```tsx
  <RoleGuard roles={["admin", "instructor"]}>...</RoleGuard>
  <PermissionGuard permission="calculator:use">...</PermissionGuard>
  ```
- When real auth is added: update `authStore.ts` and uncomment the JWT interceptor in `src/infrastructure/api/client.ts`

## DI Container

`src/application/di/container.ts` exports singleton instances. To wire up a real backend, swap `MockFlightDataRepository` → `ApiFlightDataRepository` in that file. Everything else is unchanged.

## How to Add a New Tool

1. Add an entry to the `TOOLS` array in `src/presentation/components/organisms/ToolsList/ToolsList.tsx`
   - `href` must be `"/(app)/tools/your-tool-name"`
2. Create `src/domain/entities/YourToolProfile.ts` — input and result interfaces
3. Create `src/domain/use-cases/CalculateYourTool.ts` — pure TS, throw `ValidationError` for invalid input
4. If persistence is needed, create `src/infrastructure/repositories/MockYourToolRepository.ts`
5. Register instances in `src/application/di/container.ts`
6. Create `src/application/stores/yourToolStore.ts` (Zustand)
7. Create `src/application/hooks/useYourTool.ts` — bridges hook → store → use case
8. Build UI components under `src/presentation/components/` (atoms → molecules → organisms)
9. Create `src/presentation/pages/YourToolPage/YourToolPage.tsx`, wrap in `<PermissionGuard>` if needed
10. Create `app/(app)/tools/your-tool-name.tsx` — one-liner that imports the page component

See `DescentCalculatorPage` and `useDescentCalculator` for a complete reference implementation.

## Key Version Pins


| Package               | Version    | Note                                           |
| --------------------- | ---------- | ---------------------------------------------- |
| `expo`                | `~56.0.12` | SDK 56                                         |
| `expo-router`         | `~56.2.11` | v3; do not upgrade to v4 (requires Expo 53+)   |
| `nativewind`          | `^4.1.23`  | only supports`tailwindcss@^3`                  |
| `tailwindcss`         | `^3.4.19`  | v3 ONLY — do not upgrade to v4                |
| `zustand`             | `^5.0.3`   |                                                |
| `zod`                 | `^3.24.4`  |                                                |
| `react-hook-form`     | `^7.57.0`  |                                                |
| `@hookform/resolvers` | `^3.9.0`   | v3 — not v5; required for rh-form v7 + zod v3 |

## Environment Variables


| Variable                   | Default                             | Purpose                       |
| -------------------------- | ----------------------------------- | ----------------------------- |
| `EXPO_PUBLIC_API_BASE_URL` | `https://api.flightsimtools.dev/v1` | API base URL (no backend yet) |

Prefix any client-visible env var with `EXPO_PUBLIC_`.

## EAS Build Profiles

Defined in `eas.json`:


| Profile       | Distribution | Notes                        |
| ------------- | ------------ | ---------------------------- |
| `development` | internal     | dev client enabled           |
| `preview`     | internal     | QA builds                    |
| `production`  | store        | auto-increments build number |
