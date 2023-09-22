import MainView from '../components/MainView';

function Main() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
            <div>
                <h2>Main Page</h2>
            </div>
            <MainView />
        </div>
    );
}


export default Main;