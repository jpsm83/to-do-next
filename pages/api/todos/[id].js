/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import ToDo from "../../../models/ToDo";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      // thas another way to get to dos using .then & .catch
      // ToDo.find({})
      // .then(todos =>  res.status(200).json(todos))
      // .catch(err => res.status(500).json(err))

      try {
        // next 3 lines will be use when authentication is ready
        // user in section will be able to see only his/hers todos
        // get the to dos from a user that is loggedin using session.user.email
        
        // const todo = await ToDo.findOne({ _id: id, user: session.user.email  })

        const toDo = await ToDo.findById(id);
        if (!toDo) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: toDo });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        // next 3 lines will be use when authentication is ready
        // user in section will be able to update only his/hers todos
        // get the to dos from a user that is loggedin using session.user.email
        // const todo = await ToDo.findOneAndUpdate({ id, user: session.user.email  }, req.body, { new: true })

        const toDo = await ToDo.findByIdAndUpdate(id, req.body, { new: true });
        if (!toDo) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: toDo });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        // next 3 lines will be use when authentication is ready
        // user in section will be able to delete only his/hers to dos
        // get the to dos from a user that is loggedin using session.user.email
        // const todo = await ToDo.deleteOne({ _id: id, user: session.user.email  })

        const deleteToDo = await ToDo.deleteOne({ _id: id });
        if (!deleteToDo) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
