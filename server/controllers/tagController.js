import Tag from '../model/tagModel.js';

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({ user_id: req.userId });
    res.json({ success: true, count: tags.length, data: tags });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ user_id: req.userId, name });
    res.json({ success: true, data: tag });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findOneAndUpdate(
      { _id: id, user_id: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!tag) return res.json({ success: false, message: 'Tag not found' });
    res.json({ success: true, data: tag });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findOneAndDelete({ _id: id, user_id: req.userId });
    if (!tag) return res.json({ success: false, message: 'Tag not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
