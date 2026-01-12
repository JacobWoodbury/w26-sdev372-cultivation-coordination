import express from 'express';
import cors from 'cors';
import plantRoutes from './routes/plantsRouter.js' 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', plantRoutes);
    
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 
