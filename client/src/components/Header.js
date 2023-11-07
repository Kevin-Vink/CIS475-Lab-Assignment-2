const Header = () => {
    return (
        <header className="w-full h-20 z-30 bg-neutral-900 sticky top-0 flex items-center">
            <div className='h-full p-3'>
                <img alt='logo' src='./logo.svg' className="h-full" />
            </div>
            <div className="px-8 py-4 text-white">
                Students Dashboard
            </div>
        </header>
    )
}

export default Header