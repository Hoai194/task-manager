import Task from '../model/taskModel.js';
import Project from '../model/projectModel.js';

export const getTasks = async (req, res) => {
  try {
    const { project_id } = req.query;
    let query = {};
    if (project_id) {
      const project = await Project.findOne({ _id: project_id, user_id: req.userId });
      if (!project) return res.json({ success: false, message: 'Project not found' });
      query.project_id = project_id;
    } else {
      const projects = await Project.find({ user_id: req.userId });
      const projectIds = projects.map(p => p._id);
      query.project_id = { $in: projectIds };
    }

    const tasks = await Task.find(query).populate('tags');
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { project_id } = req.body;
    const project = await Project.findOne({ _id: project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Project not found or not authorized' });
    
    const task = await Task.create(req.body);
    res.json({ success: true, data: task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ success: false, message: 'Task not found' });
    
    const project = await Project.findOne({ _id: task.project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Not authorized' });

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updatedTask });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ success: false, message: 'Task not found' });
    
    const project = await Project.findOne({ _id: task.project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Not authorized' });

    await Task.findByIdAndDelete(id);
    res.json({ success: true, data: {} });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ success: false, message: 'Task not found' });
    
    const project = await Project.findOne({ _id: task.project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Not authorized' });

    task.status = task.status === 'done' ? 'todo' : 'done';
    await task.save();
    res.json({ success: true, data: task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ success: false, message: 'Task not found' });

    const project = await Project.findOne({ _id: task.project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Not authorized' });

    task.subtasks.push(req.body);
    await task.save();
    res.json({ success: true, data: task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleSubTask = async (req, res) => {
  try {
    const { id, subId } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ success: false, message: 'Task not found' });

    const project = await Project.findOne({ _id: task.project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Not authorized' });

    const subtask = task.subtasks.id(subId);
    if (!subtask) return res.json({ success: false, message: 'Subtask not found' });

    subtask.is_done = !subtask.is_done;
    await task.save();
    res.json({ success: true, data: task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteSubTask = async (req, res) => {
  try {
    const { id, subId } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ success: false, message: 'Task not found' });

    const project = await Project.findOne({ _id: task.project_id, user_id: req.userId });
    if (!project) return res.json({ success: false, message: 'Not authorized' });

    const subtask = task.subtasks.id(subId);
    if (!subtask) return res.json({ success: false, message: 'Subtask not found' });

    task.subtasks.pull(subId);
    await task.save();
    res.json({ success: true, data: task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
