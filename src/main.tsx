
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import './styles/header.css'
import './styles/loan-calculator.css'
import './styles/loan-results.css'
import './styles/loan-amortization.css'
import './styles/pagination.css'
import './styles/footer.css'

createRoot(document.getElementById("root")!).render(<App />);
