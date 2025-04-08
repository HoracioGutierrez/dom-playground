import { LocaleSelector } from "gt-next/client"
import { ThemeSwitcher } from "../theme-switcher"

function Header() {
    return (
        <header className="bg-background border-b-4 h-14 flex items-center justify-between">
            <h1 className="text-lg uppercase text-foreground font-heading pl-4">DOM PLAYGROUND</h1>
            <nav className="flex self-stretch">
                <div className="border-l-4 px-2 flex items-center font-bold">
                    <LocaleSelector />
                </div>
                <ThemeSwitcher />
            </nav>
        </header>
    )
}
export default Header