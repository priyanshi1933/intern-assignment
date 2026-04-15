import { Request, Response } from "express";
import { createBookmark, deleteBookmark, getBookmark, getBookmarkById} from "../services/bookmark.service";


export const create = async (req: Request, res: Response) => {
  try {
    console.log("hjsdhfs")
    const {url} = req.body;
    console.log(url)
    const bookmark = await createBookmark(url);
    res.json(bookmark);
  } catch (error) {
    console.log(error);
    res.json({ message: "Record not inserted" });
  }
  
};

export const readById = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const bookmark = await getBookmarkById(id);
    res.json(bookmark);
  } catch (error) {
    res.json({ message: "Record not found" });
  }
};

export const read = async (req: Request, res: Response) => {
  const search=req.query.search as string;
  try {
    const bookmark = await getBookmark(search);
    res.json(bookmark);
  } catch (error) {
    res.json({ message: "No Record" });
  }
};

export const delBookmark = async (req: Request, res: Response) => {
  try {
    const id = Object(req.params.id);
    const deleted = await deleteBookmark(id);
    res.json(deleted);
  } catch (error) {
    console.log(error)
    res.json({ message: "Record is not deleted" });
  }
};
