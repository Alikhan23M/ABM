const bodyCard = require('../models/bodyCardModel')
// getAll bodyCards
exports.getBodyCard = async(req,res)=>{
try {
    const bodyCardData = await bodyCard.find();
    res.status(200).json(bodyCardData);
} catch (error) {
    res.status(400).json("An error occured while fetching bodyCards data",error)
}
}
// Create a new body card
exports.createBodyCard = async(req,res)=>{
   try {
     const {title,description,image,url} = req.body;
    const newbodyCard = new bodyCard({
        title,
        description,
        image,
        url
    });
    await newbodyCard.save();
    res.status(201).json(newbodyCard);
   } catch (error) {
    res.status(400).json('An error occured',error);
   }
}

// Update an existing bodycard

exports.updateBodyCard = async(req,res)=>{
try {
    const {title,description,image,url} = req.body;
    const updatedBodyCard = await bodyCard.findByIdAndUpdate(
        req.params.id,
        {title,description,image,url},
        {new:true}
    )
    if(!updatedBodyCard){
        return res.status(404).json({message:"BodyCard not found"})
    }
    res.status(200).json(updatedBodyCard);
} catch (error) {
    res.status(400).json("An error occured while updating bodyCard data",error)
}
}


// Delete a body card 
exports.deleteBodyCard = async (req, res) => {
  try {
    console.log('Deleting body card with ID:', req.params.id);
    const deletedBodyCard = await bodyCard.findByIdAndDelete(req.params.id);
    if (!deletedBodyCard) {
      return res.status(404).json({ message: "BodyCard not found" });
    }
    res.status(200).json({ message: "BodyCard deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "An error occurred while deleting bodyCard data", error });
  }
};
