const express = require('express')
const { CodingReview, McqReview, GdReview, HackathonReview, TechHrReview, PersonalHrReview } = require('../Database/schema')
const codingreviewAdder = express.Router()


codingreviewAdder.post('/',async(req,res)=>{
    try{
        const {nameOfTheRound,roundNo,companyName,batch,role,Package,typeOfQuestions,level,noOfQuestions,timeGiven,feedBack,status}  = req.body
        const id = req.cookies.user_id
        const userdata = await User.find({_id:id})
        const username = userdata[0].username
        const rollNo = userdata[0].rollNo
        const studentBatch = userdata[0].batch
        const roundno = parseInt(roundNo)

        const mcqreviewAvailable = await McqReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
        const gdreviewAvailable = await GdReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
        const hackathonreviewAvailable = await HackathonReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
        const techhrreviewAvailable = await TechHrReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
        const personalreviewAvailable = await PersonalHrReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
        const codingreviewAvailable = await CodingReview.find({ $and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
        
        if(roundno===1){
            if(mcqreviewAvailable.length!==0 || gdreviewAvailable.length!==0 || hackathonreviewAvailable!==0 || techhrreviewAvailable.length!==0 || personalreviewAvailable.length!==0 || codingreviewAvailable.length!==0){
                return res.status(200).json({
                    Success : false,
                    Message : "You Have Already Added Review for this Company's Round! You can Add Review for Furthur Rounds..."
                })
            }else{
                const addcodingreview = new CodingReview({
                    username : username,
                    rollNo : rollNo,
                    studentBatch : studentBatch,
                    nameOfTheRound : nameOfTheRound,
                    roundNo : roundno,
                    companyName : companyName,
                    batch : batch,
                    role : role,
                    Package : Package,
                    typeOfQuestions : typeOfQuestions,
                    level : level,
                    noOfQuestions : noOfQuestions,
                    timeGiven : timeGiven,
                    feedBack : feedBack,
                    status : status
                })
                await addcodingreview.save()
                return res.status(200).json({
                    Success : true,
                    Message : "Coding Review Added Successfully!"
                })
            }
        }else if(roundno>1){

           const previousRoundNo = roundno-1

           const mcqpreviousReviewAvailable = await McqReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : previousRoundNo}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           const gdpreviousReviewAvailable = await GdReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : previousRoundNo}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           const techhrpreviousReviewAvailable = await TechHrReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : previousRoundNo}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           const hackathonpreviousReviewAvailable = await HackathonReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : previousRoundNo}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           const presonalhrpreviousReviewAvailable = await PersonalHrReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : previousRoundNo}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           const codingpreviousReviewAvailable = await CodingReview.find({ $and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : previousRoundNo}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           
           if(mcqpreviousReviewAvailable.length!==0 || gdpreviousReviewAvailable.length!==0 || techhrpreviousReviewAvailable.length!==0 || hackathonpreviousReviewAvailable.length!==0 || presonalhrpreviousReviewAvailable.length!==0 || codingpreviousReviewAvailable.length!==0){
            
            const mcqreviewAvailable2 = await McqReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
            const gdreviewAvailable2 = await GdReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
            const hackathonreviewAvailable2 = await HackathonReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
            const techhrreviewAvailable2 = await TechHrReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
            const personalreviewAvailable2 = await PersonalHrReview.find({$and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
            const codingreviewAvailable2 = await CodingReview.find({ $and : [{username:username}, {rollNo : rollNo}, {studentBatch : studentBatch}, {roundNo : roundno}, {companyName : companyName}, {batch  : batch}, {role : role}, {Package : Package}]})
           
            if(mcqreviewAvailable2.length!==0 || gdreviewAvailable2.length!==0 || hackathonreviewAvailable2.length!==0 || techhrreviewAvailable2.length!==0 || personalreviewAvailable2.length!==0 || codingreviewAvailable2.length!==0){
                return res.status(200).json({
                    Success : false,
                    Message : "You Have Already Added Review for this Company's Round! You can Add Review for Furthur Rounds..."
                })
            }else{
                const addcodingreview = new CodingReview({
                    username : username,
                    rollNo : rollNo,
                    studentBatch : studentBatch,
                    nameOfTheRound : nameOfTheRound,
                    roundNo : roundno,
                    companyName : companyName,
                    batch : batch,
                    role : role,
                    Package : Package,
                    typeOfQuestions : typeOfQuestions,
                    level : level,
                    noOfQuestions : noOfQuestions,
                    timeGiven : timeGiven,
                    feedBack : feedBack,
                    status : status
                })
                await addcodingreview.save()
                return res.status(200).json({
                    Success : true,
                    Message : "Coding Review Added Successfully!"
                })
            }
           }else{
            return res.status(200).json({
                Success : true,
                Message : `You Have not Added Review for Round Number ${previousRoundNo} of ${companyName}! So Please Add Round ${previousRoundNo} and Move Furthur...`
            })
           }
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            Success : false,
            Message : "There is an Error in Adding Your Coding Review! Please Try Again After Sometimes..."
        })
    }
})


module.exports = codingreviewAdder