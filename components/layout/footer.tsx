import { Github } from "lucide-react";

function Footer() {

    const getYear = () => {
        return new Date().getFullYear()
    }

    return (
        <footer className="pt-4 pb-2 text-center text-sm text-foreground/50 flex flex-col items-center gap-1">
            <p>&copy; Copyright {getYear()}</p>
            <p>Created by Horacio Gutierrez</p>
            <a
                href="https://github.com/HoracioGutierrez/dom-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
                <Github className="size-4" />
                GitHub
            </a>
        </footer>
    )
}
export default Footer