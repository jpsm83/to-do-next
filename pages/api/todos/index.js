/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import ToDo from "../../../models/ToDo";
import { getSession } from "next-auth/react";

dbConnect();

export default async (req, res ) => {

  const session = await getSession({ req })

  const { method } = req;

  switch (method) {
      case "GET":
      // thas another way to get to dos using .then & .catch
      // ToDo.find({})
      // .then(todos =>  res.status(200).json(todos))
      // .catch(err => res.status(500).json(err))

      try {
        // next 3 lines will be use when authentication is ready
        // user in section will be able to see only his/hers todos
        // get the to dos from a user that is loggedin using req.user.id
        // const todos = await ToDo.find({ user: user })

        const todos = await ToDo.find({});
        res.status(200).json({ success: true, data: todos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      const { title, description, dueDate } = req.body;

      if (!req.body) {
        // error code 400 - bad request
        return res.status(400).json({ message: "All fields are required" });
      }

      try {
        const todo = await ToDo.create({
          title,
          description,
          dueDate,
          user: session.user.email,
        });
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}