import { BookmarkModel } from "../models/bookmark.model";
import urlMetadata from "url-metadata";


export const createBookmark = async (url:string) => {
   try {
    // const url = '';
    const metadata = await urlMetadata(url);
    // console.log(metadata);
    const domain = new URL(url).hostname;
    const title = metadata.title || '';
    console.log(title);
    const description = metadata.description || '';
    const tags = metadata.keywords || '';
    return await BookmarkModel.create({url,domain,title,description,tags});
  } catch (err:any) {
    console.log(err);
    // if (err.paymentRequired && err.x402) {
    // }
  }
  // return await BookmarkModel.create({userId,url,domain,title,description,tags});
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