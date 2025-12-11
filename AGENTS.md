Here is a set of strict naming rules optimized for an AI coding agent using React and TypeScript. You can copy-paste this directly into your system prompt, `.cursorrules`, or agent instructions.

### System Rules: React & TypeScript Naming Conventions

You must adhere to the following naming conventions when generating, refactoring, or analyzing React code.

#### 1\. Components

  * **Rule:** MUST use **PascalCase**.
  * **Constraint:** This applies to the function definition, the export name, and the usage in JSX.
  * **Reasoning:** JSX differentiates native HTML elements (lowercase) from custom React components (uppercase) strictly by capitalization.
  * **Example:**
    ```tsx
    // ✅ Correct
    export const UserCard = () => { ... }

    // ❌ Incorrect
    export const userCard = () => { ... }
    ```

#### 2\. File Names

  * **Rule:** MUST match the primary exported component's name exactly in **PascalCase**.
  * **Extension:** MUST use `.tsx` for files containing JSX. Use `.ts` only for pure logic/utility files.
  * **Example:**
      * Component `UserProfile` $\rightarrow$ File `UserProfile.tsx`
      * Utility `formatDate` $\rightarrow$ File `formatDate.ts` (camelCase is acceptable for non-component utilities, but consistency is key).

#### 3\. TypeScript Interfaces & Types

  * **Rule:** Use **PascalCase**.
  * **Prop Interfaces:** MUST be named `{ComponentName}Props`. Do not use the `I` prefix (e.g., `IProps`).
  * **Example:**
    ```tsx
    interface SubmitButtonProps {
      isLoading: boolean;
      label: string;
    }

    export const SubmitButton = ({ isLoading, label }: SubmitButtonProps) => { ... }
    ```

#### 4\. Props & Variables

  * **Rule:** Use **camelCase**.
  * **Booleans:** Should use auxiliary verbs like `is`, `has`, or `should` (e.g., `isVisible`, `hasError`).
  * **Event Handlers (Props):** Use `on` prefix (e.g., `onClick`, `onSubmit`).
  * **Event Handlers (Internal Functions):** Use `handle` prefix (e.g., `handleClick`, `handleSubmit`).

#### 5\. Hooks

  * **Rule:** MUST use **camelCase** and strictly start with the prefix `use`.
  * **Example:** `useAuthUser`, `useDebounce`.

-----

### Summary Table for Agent

| Entity | Case Style | Pattern/Suffix | Example |
| :--- | :--- | :--- | :--- |
| **Component** | PascalCase | N/A | `NavBar` |
| **File (.tsx)** | PascalCase | Matches Component | `NavBar.tsx` |
| **Interface** | PascalCase | `...Props` | `NavBarProps` |
| **Prop/Variable**| camelCase | N/A | `isActive` |
| **Hook** | camelCase | `use...` | `useTheme` |
| **Constant** | UPPER\_SNAKE | N/A | `MAX_COUNT` |

-----

**Would you like me to generate an ESLint configuration snippet that enforces these rules automatically?**