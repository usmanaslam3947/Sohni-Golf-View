const apartment = require('../model/ApartmentModel');


// exports.createApartment = async(req,res)=>{
//     const apart = req.body.apartment;
//     const status = await apartment.createApartment(apart);
//     console.log(status);
//     res.send(status);
//     // if (status === true) {
//     //     res.status(200).send("Success");  
//     // }else{
//     //     res.send("Failed insertion");
//     // }


// }

exports.getApartment = async(req,res)=>{
    try{
        const [allApartments] = await apartment.getApartment();
        res.status(200).json(allApartments);
    }catch(e){
        console.log("Error Getting Apartments "+e)
    }finally{
        console.log("In get apartment controller")
    }

}

// const updateApartment = (req,res)=>{
    
// }

// const deleteApartment = (req,res)=>{
    
// }

// module.exports = {
//     createApartment,
//     updateApartment,
//     deleteApartment
// }