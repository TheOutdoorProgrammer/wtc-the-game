function Layout(props) {
    return (
        <div>
            <header className="App-header">
                <h1>{props.header}</h1>
            </header>
            <main>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;