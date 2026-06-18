# Presentation Layer

Atomic Design component hierarchy: atoms → molecules → organisms → templates → pages.

## Layer Definitions

| Layer | Path | What goes here |
|---|---|---|
| atoms | `components/atoms/` | Single-purpose primitives: `Text`, `Button`, `Input`, `Badge`, `Icon` |
| molecules | `components/molecules/` | Composed atoms: `FormField`, `ResultCard`, `ToolCard` |
| organisms | `components/organisms/` | Feature sections: `DescentCalculatorForm`, `DescentResultsPanel`, `ToolsList`, `AppHeader` |
| templates | `components/templates/` | Layout shells with slots: `CalculatorTemplate`, `ListTemplate` |
| pages | `pages/` | Full screens composed from templates + organisms; imported by `app/` route files |

## NativeWind Rules

- Apply Tailwind classes via `className` prop directly — no `styled()` wrapper needed
- Use `contentContainerStyle` (not `contentContainerClassName`) on `ScrollView`
- Responsive prefix `md:` targets 768 px+ (web tablet/desktop)
- Platform-specific variants: use `.native.tsx` / `.web.tsx` file extensions when needed

## Auth Guards

```tsx
// Show content only to specific roles:
<RoleGuard roles={["admin", "instructor"]} fallback={<Text>Access denied</Text>}>
  <AdminPanel />
</RoleGuard>

// Show content only when user has a permission:
<PermissionGuard permission="calculator:use">
  <DescentCalculatorPage />
</PermissionGuard>
```

Both guards read from `useAuthStore()` — no prop drilling, no context needed at call sites.

## Available Templates

- **`CalculatorTemplate`** — header slot + scrollable form area + results area; used by `DescentCalculatorPage`
- **`ListTemplate`** — header slot + scrollable content area; used by `ToolsListPage` and `HomePage`
