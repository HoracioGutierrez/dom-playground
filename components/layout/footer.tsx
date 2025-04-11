function Footer() {

    const getYear = () => {
        return new Date().getFullYear()
    }

    return (
        <footer className="pt-4 pb-2 text-center text-sm text-foreground/50">
            <p>&copy; Copyright {getYear()}</p>
            <p>Created by Horacio Gutierrez</p>
        </footer>
    )
}
export default Footer