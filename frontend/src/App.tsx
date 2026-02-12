import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        {/* Routes will be added here */}
        <h1>Library Management System</h1>
      </div>
    </Router>
  );
}

export default App;
