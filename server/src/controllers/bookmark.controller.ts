import { Request, Response } from "express";
import { createBookmark, deleteBookmark, getBookmark, getBookmarkById} from "../services/bookmark.service";



export const create = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const bookmark = await createBookmark(url);
    res.status(201).json(bookmark); 
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: "Internal server error" });
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
