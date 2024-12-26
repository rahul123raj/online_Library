const { bookModel } = require("../Model/bookmodel")
const cloudinary = require('cloudinary').v2
const {v4:uuidv4} = require('uuid')
const multer = require('multer')
const fs = require('fs').promises
const path = require('path')
const fs1 = require('fs')


//! cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
})

//! initialize multer diskstorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads"); // Construct absolute path
    // console.log(uploadPath)
    // Ensure the directory exists
    if (!fs1.existsSync(uploadPath)) {
        fs1.mkdirSync(uploadPath);
    }
    
    cb(null, uploadPath); // Use absolute path here
},
    filename: function (req, file, cb) {
        let random = uuidv4()
        // console.log(random)
      cb(null, random+""+file.originalname)
      // console.log(file,"in random")
      // console.log("filepath",req.file.path)
    }
  })

  // console.log(storage,"storage")
  
  const upload = multer({ storage: storage })
  // console.log("upload",upload)

  const postBook = async (req, res) => {
    try {
      let uploadResult;
  
      if (req.file) {
        // Upload an image to Cloudinary
        uploadResult = await cloudinary.uploader.upload(req.file.path);
        await fs.unlink(req.file.path); // Remove the file from local storage
        console.log("File deleted from local storage");
      }
  
      let { title, isbn, pageCount, publishedDate, shortDescription, longDescription, status, authors, categories } = req.body;
  
      console.log("Before processing:", authors, categories);
  
      // Parse authors and categories if provided as JSON strings
      authors = authors ? JSON.parse(authors) : [];
      categories = categories ? JSON.parse(categories) : [];
  
      console.log("After processing:", authors, categories);
  
      // Create and store the book in the database
      let payload = await bookModel.create({
        thumbnailUrl: uploadResult ? uploadResult.secure_url : '',
        authors: authors,
        categories: categories,
        title,
        isbn,
        pageCount,
        publishedDate,
        shortDescription,
        longDescription,
        status,
      });
  
      res.status(200).json({
        success: true,
        message: "Book posted successfully",
        payload,
      });
      console.log("payload",payload)
    } catch (error) {
      console.error("Error posting book:", error);
      res.status(500).json({
        success: false,
        message: "Failed to post book",
        error: error.message,
      });
    }
  };
  


const getBookData = async(req,res) =>{
  try {

    let {filter, search} = req.query;

    if (filter) {
      // Convert filter into an array if it's a comma-separated string
      filter = filter.split(',');
    }
    // console.log(filter)

    let query = {};

    // Add search conditions to the query if `search` is not empty
    if (search && search.trim().length > 0) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { authors: { $regex: search, $options: "i" } }
      ];
    }
    
    // Add categories condition to the query if `filter` is a valid non-empty array
    if (Array.isArray(filter) && filter.length > 0) {
      query.categories = { $in: filter };
    }
    
    // Execute the query
    let payload = await bookModel.find(query);
    
    // console.log(payload)
    res
    .status(200)
    .json({
        success : true,
        messsage : "data is sent",
        payload
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
}

const getBookDataById = async(req,res) =>{
  try {
    let payload = await bookModel.find({_id : req.params.id})
    res
    .status(200)
    .json({
        success : true,
        messsage : "data is sent by id",
        payload
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
}

const deleteBookData = async(req,res) =>{
  try {
    let payload = await bookModel.deleteOne({_id:req.params.id})
  res
  .status(200)
  .json({
      success : true,
      messsage : "data is deleted",
      // payload
  })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
}

const updateBookData = async(req,res) =>{
  try {
    
    let uploadResult = null;
  
 
  if (req.file) {
      uploadResult = await cloudinary.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      console.log("file is deleted in updated")
  }

  // Extract other fields from the request body
let { title, isbn, pageCount, publishedDate, shortDescription, longDescription, status, authors, categories } = req.body;

// Prepare the update payload
let updatePayload = {
    title,
    isbn,
    pageCount,
    publishedDate,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
};
console.log(updatePayload)
// Add thumbnailUrl if a new file was uploaded
if (uploadResult) {
    updatePayload.thumbnailUrl = uploadResult.secure_url;
}

// Perform the update operation
let payload = await bookModel.updateOne(
    { _id: req.params.id },
    { $set: updatePayload }
);
  res
  .status(200)
  .json({
      success : true,
      messsage : "data is updated",
      payload
  })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
  
}

const getBookCategory = async (req, res) => {
  try {
    let payload = await bookModel.aggregate([
      {
        $group: {
          _id: null,
          distinctCategories: {
            $addToSet: '$categories' // Collects all unique categories arrays
          }
        }
      },
      { $unwind: '$distinctCategories' }, // Flattens the arrays of categories
      { $unwind: '$distinctCategories' }, // Flattens individual categories
      {
        $group: {
          _id: null,
          categories: {
            $addToSet: '$distinctCategories' // Collects unique categories again
          }
        }
      },
      { $project: { _id: 0, categories: 1 } } // Keeps only the categories field
    ]);

    // If you want to directly return categories (instead of nested in `payload`):
    let categories = payload[0]?.categories || []; // Extract categories array safely

    res.status(200).json({
      success: true,
      message: "Fetched categories successfully",
      categories // Sending categories directly
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};


module.exports = {upload,getBookData,postBook,updateBookData,deleteBookData,getBookDataById, getBookCategory}
