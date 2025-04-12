import { ThemeSwitcher } from "../theme-switcher";
import LanguageSwitcher from "../language-switcher";
import { T } from "gt-next";

function Header() {
  return (
    <>
      <header className="flex xl:p-0 px-4 xl:justify-center 2xl:max-w-[1566px] mx-auto relative w-full">
        <div className="pb-12 pt-4 flex flex-col 2xl:justify-center 2xl:text-center">
          <T>
            <h2 className="font-heading text-3xl">The DOM Playground</h2>
            <p className="text-foreground/50 font-base">
              Drag and drop HTML tags to the left into the dropzone to the
              right.
            </p>
          </T>
        </div>
        <div className="absolute top-4 right-4 2xl:right-0 flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </header>
    </>
  );
}
export default Header;
