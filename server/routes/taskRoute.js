import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  createSubTask,
  toggleSubTask,
  deleteSubTask,
  addTagToTask,
  removeTagFromTask,
  getTasksByDateRange
} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const taskRouter = Router();

taskRouter.use(auth); 

taskRouter.get('/', getTasks);           
taskRouter.post('/', createTask);        
taskRouter.put('/:id', updateTask);      
taskRouter.delete('/:id', deleteTask);   
taskRouter.patch('/:id/toggle', toggleTask);

// Sub tasks
taskRouter.post('/:id/subtasks', createSubTask);        
taskRouter.patch('/:id/subtasks/:subId/toggle', toggleSubTask); 
taskRouter.delete('/:id/subtasks/:subId', deleteSubTask);  

taskRouter.get('/calendar', getTasksByDateRange)
taskRouter.post('/:id/tags', addTagToTask);        
taskRouter.delete('/:id/tags/:tag_id', removeTagFromTask); 
export default taskRouter;
