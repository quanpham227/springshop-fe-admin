import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DasboardPage from './pages/DasboardPage';

function App() {
    return (
        <BrowserRouter>
            <DasboardPage></DasboardPage>
        </BrowserRouter>
    );
}

export default App;
