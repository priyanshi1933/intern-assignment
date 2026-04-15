import { BookmarkModel } from "../models/bookmark.model";
import urlMetadata from "url-metadata";



export const createBookmark = async (url: string) => {
  try {
    const validUrl = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(validUrl).hostname;

    let metadata: any = {};
    try {
      metadata = await urlMetadata(validUrl);
    } catch (metaErr) {
      console.log("Metadata fetch failed, creating basic bookmark:", metaErr);
    }

    const title = metadata.title || 'Untitled';
    const description = metadata.description || '';
    const tags = metadata.keywords || '';

   
    return await BookmarkModel.create({
      url: validUrl, 
      domain, 
      title, 
      description, 
      tags 
    });
  } catch (err: any) {
    console.error("Database or URL Error:", err);
    throw err;
  }
};


export const getBookmarkById = async (id: string) => {
  return await BookmarkModel.findById(id).populate("userId");
};

export const getBookmark = async (search:string) => {
  const query = search ? { title: { $regex: search, $options: "i" } } : {};
  const bookmark=await BookmarkModel.find(query)
  return bookmark;
};

export const deleteBookmark=async(id:string)=>{
    return await BookmarkModel.findByIdAndDelete(id);
}