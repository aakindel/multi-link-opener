import Link from "next/link";
import ThemeChanger from "./theme-changer";

export function MainNav() {
  return (
    <header className="w-full border-b bg-white dark:bg-neutral-950">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="text-base font-medium text-neutral-950 dark:text-neutral-50"
        >
          Multi Link Opener
        </Link>
        <ThemeChanger />
      </div>
    </header>
  );
}
