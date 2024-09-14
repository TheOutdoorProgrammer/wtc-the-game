import Layout from './Layout';

function App() {
    return (
        <Layout header="WTC The Game">
            <p>
                Welcome to the WTC The Game!
            </p>
            <p>
                This was a project I created after I learned about the complex vertical transit system in the World
                Trade Center. <a href="https://www.tiktok.com/t/ZP8ekNmqM/">This</a> post on tiktok inspired me
                to create this game. This "game" is completely text-based and is meant to be a fun way to learn about
                the WTC, the vertical transit system, the companies on each floor and some 9/11 history.
            </p>
            <h2>
                Start Playing
            </h2>
            <p><a href="/map">View Map and Company Directory</a></p>
            <p><a href="/game/1">Enter WTC 1</a></p>
            <p><a href="/game/2">Enter WTC 2</a></p>
        </Layout>
    );
}

export default App;
