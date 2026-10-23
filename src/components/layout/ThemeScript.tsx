import { THEME_STORAGE_KEY } from "@/lib/theme-constants";

/**
 * Inline script that applies the persisted theme before first paint to
 * avoid a flash of the wrong theme. Rendered in <head> from the root layout.
 */
const script = `(function(){try{var k="${THEME_STORAGE_KEY}";var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export function ThemeScript() {
  // The script runs during HTML parsing, before React loads, so hydration only
  // needs to adopt the node. suppressHydrationWarning keeps browser extensions
  // that inject their own <script> into <head> from triggering a mismatch
  // warning when React pairs their node with this one.
  return <script id="theme-script" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
}
