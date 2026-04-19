import { Router } from 'express'
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  removeAccount 
} from '../controllers/userController.js'

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me', getProfile);
userRouter.put('/me', updateProfile);
userRouter.delete('/me', removeAccount); 

export default userRouter;