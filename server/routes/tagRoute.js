import { Router } from 'express';
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from '../controllers/tagController.js';
import auth from '../middleware/auth.js';

const tagRouter = Router();

tagRouter.use(auth);

tagRouter.get('/', getTags);          
tagRouter.post('/', createTag);        
tagRouter.put('/:id', updateTag);      
tagRouter.delete('/:id', deleteTag);   

export default tagRouter;