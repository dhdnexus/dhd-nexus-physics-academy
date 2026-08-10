// lucide-react 1.28 publishes its declarations via the legacy `typings`
// field. TypeScript 6 resolves the package entry point through `types`, so
// bridge to the package's bundled declarations without changing dependencies.
declare module "lucide-react" {
  export * from "lucide-react/dist/lucide-react";
}
