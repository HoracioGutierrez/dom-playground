import { LocaleSelector } from "gt-next/client"
import { ThemeSwitcher } from "../theme-switcher"

function Header() {
    return (
        <header className="bg-background border-b-border border-b-4 h-14 flex items-center justify-between">
            <h1 className="text-xl uppercase text-foreground font-heading pl-4">Titulo</h1>
            <div className="flex self-stretch">
                <div className="border-l-4 px-2 flex items-center">
                    <LocaleSelector />
                </div>
                <ThemeSwitcher />
            </div>
        </header>
    )
}
export default Header