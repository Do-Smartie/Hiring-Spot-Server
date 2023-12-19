const mongoose = require('mongoose')

const {db} = require('./mongoose.js')
const { Double } = require('mongodb')

// Schema for Registering Account by Wishable Users

const userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    oldUserName : {
        type : String
    },
    fullName :{
        type : String
    },
    password : {
        type : String
    },
    email : {
        type : String
    },
    regNo : {
        type : String
    },
    rollNo : {
        type : String
    },
    userType : {
        type : String
    },
    batch : {
        type : String
    },
    department : {
        type : String
    },
    gender : {
        type : String
    },
    dob :{
        type : Date
    },
    tenthPercent : {
        type : Number
    },
    twelthPercent : {
        type : Number
    },
    diplomaPercent : {
        type : Number
    },
    cgpa :{
        type : Number
    },
    edit : {
        type : String
    },
    noOfArrears : {
        type : Number
    },
    historyOfArrears : {
        type : Number
    },
    mobileNumber : {
        type : Number
    },
    address : {
        type : String
    },
    RegistrationCompanyCount : {
        type : Number
    },
    Placed : {
        type : String
    }
})


const facultySchema = new mongoose.Schema({
    username : {
        type : String
    },
    oldUserName : {
        type : String
    },
    password : {
        type : String
    },
    email : {
        type : String
    },
    rollNo : {
        type : String
    },
    userType : {
        type : String
    },
    department : {
        type : String
    }
})






// Schema for Adding Companies by Admin

const companySchema = new mongoose.Schema({
    companyName : {
        type : String
    },
    package : {
        type : Number
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    category : {
        type : String
    },
    lastDateOfReg : {
        type : Date
    },
    batch : {
        type : String
    },
    RegistrationCount : {
        type : Number
    },
    PlacedCount : {
        type : Number
    },
    dateOfDrive : {
        type : Date
    },
    Date : {
        type : Number
    },
    Month : {
        type : Number
    },
    Year : {
        type : Number
    },
    status : {
        type : String
    }
})


// Schema for Company Registration by Students 

const registrationSchema = new mongoose.Schema({
    companyName : {
        type : String
    },
    Package : {
        type :  Number
    },
    batch : {
        type : String
    },
    registerNumber : {
        type : String
    },
    rollNumber : {
        type : String
    },
    name : {
        type : String
    },
    department : {
        type : String
    },
    gender : {
        type : String
    },
    role : {
        type : String
    },
    dob :{
        type : Date
    },
    dateOfDrive : {
        type : Date
    },
    tenthPercent : {
        type : Number
    },
    twelthPercent : {
        type : Number
    },
    diplomaPercent : {
        type : Number
    },
    cgpa :{
        type : Number
    },
    noOfArrears : {
        type : Number
    },
    historyOfArrears : {
        type : Number
    },
    mobileNumber : {
        type : Number
    },
    mailID : {
        type : String
    },
    address : {
        type : String
    },
    onePageResume : {
        type : String
    },
    threePageResume : {
        type : String
    }
})


// Schema for Adding JD by Users 

const jdSchema = new mongoose.Schema({
    CompanyName : {
        type : String
    },
    Batch : {
        type : String
    },
    Role : {
        type : String
    },
    JD_Available : [{
        Original_Filename : String,
        Generated_Filename : String
    }]
})


// Schema for adding Results (File) by Admin


const resultSchema = new mongoose.Schema({
    CompanyName : {
        type : String
    },
    Batch : {
        type : String
    },
    RoundNumber : {
        type : Number
    },
    Role : {
        type : String
    },
    Result_Available : [{
        Original_Filename : String,
        Generated_Filename : String
    }]
})

// Schema for Adding Result Details by Faculty Placement Coordinator


const resultdetailsSchema = new mongoose.Schema({
    companyName : {
        type : String
    },
    fullName : {
        type : String
    },
    regNo : {
        type : String
    },
    rollNo : {
        type : String
    },
    department : {
        type : String
    },
    role : {
        type :String
    },
    batch : {
        type : String
    },
    Package : {
        type : Number
    }
})


// Schema for Adding Admin Details

const adminSchema = new mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    userType : {
        type : String
    },
    department : {
        type : String
    },
    rollNo : {
        type : String
    }
})


const mcqSchema = new mongoose.Schema({
    username : {
        type : String
    },
    rollNo : {
        type : String
    },
    studentBatch : {
        type : String
    },
    nameOfTheRound : {
        type : String
    },
    roundNo : {
        type : Number
    },
    companyName : {
        type : String
    },
    batch : {
        type : String
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    typeOfQuestions : {
        type : Array
    },
    level : {
        type : String
    },
    noOfQuestions : {
        type : Number
    },
    timeGiven : {
        type : String
    },
    feedBack : {
        type : String
    },
    status : {
        type : String  
    }
})


const codingSchema = new mongoose.Schema({
    username : {
        type : String
    },
    rollNo : {
        type : String
    },
    studentBatch : {
        type : String
    },
    nameOfTheRound : {
        type : String
    },
    roundNo : {
        type : Number
    },
    companyName : {
        type : String
    },
    batch : {
        type : String
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    typeOfQuestions : {
        type : Array
    },
    level : {
        type : String
    },
    noOfQuestions : {
        type : Number
    },
    timeGiven : {
        type : String
    },
    feedBack : {
        type : String
    },
    status : {
        type : String  
    }
})


const gdScheme = new mongoose.Schema({
    username : {
        type : String
    },
    rollNo : {
        type : String
    },
    studentBatch : {
        type : String
    },
    nameOfTheRound : {
        type : String
    },
    roundNo : {
        type : Number
    },
    companyName : {
        type : String
    },
    batch : {
        type : String
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    topic : {
        type : Array
    },
    level : {
        type : String
    },
    gdDuration : {
        type : String
    },
    feedBack : {
        type : String
    },
    status : {
        type : String  
    }
})

const techhrSchema = new mongoose.Schema({
    username : {
        type : String
    },
    rollNo : {
        type : String
    },
    studentBatch : {
        type : String
    },
    nameOfTheRound : {
        type : String
    },
    roundNo : {
        type : Number
    },
    companyName : {
        type : String
    },
    batch : {
        type : String
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    typeOfQuestions : {
        type : Array
    },
    level : {
        type : String
    },
    interviewDuration : {
        type : String
    },
    feedBack : {
        type : String
    },
    status : {
        type : String  
    }
})


const personalhrScheme = new mongoose.Schema({
    username : {
        type : String
    },
    rollNo : {
        type : String
    },
    studentBatch : {
        type : String
    },
    nameOfTheRound : {
        type : String
    },
    roundNo : {
        type : Number
    },
    companyName : {
        type : String
    },
    batch : {
        type : String
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    feedBack : {
        type : String
    },
    interviewDuration : {
        type : String
    },
    typeOfQuestions : {
        type : Array
    },
    status : {
        type : String  
    }
})

const hackathonSchema = new mongoose.Schema({
    username : {
        type : String
    },
    rollNo : {
        type : String
    },
    studentBatch : {
        type : String
    },
    nameOfTheRound : {
        type : String
    },
    roundNo : {
        type : Number
    },
    companyName : {
        type : String
    },
    batch : {
        type : String
    },
    role : {
        type : String
    },
    Package : {
        type : String
    },
    level : {
        type : String
    },
    problemStatements : {
        type : String
    },
    hackathonDuration : {
        type : String
    },
    feedBack : {
        type : String
    },
    status : {
        type : String  
    }
})



module.exports = {
    User : db.model('User',userSchema,'USER'),
    Faculty : db.model('Faculty',facultySchema,'FACULTY'),
    Company : db.model('Company',companySchema,'COMPANY'),
    Jd : db.model('Jd',jdSchema,'JD'),
    Register : db.model('Register',registrationSchema,'COMPANY_REGISTRATION'),
    Result : db.model('Result',resultSchema,'RESULT'),
    Resultdetails : db.model('Resultdetail',resultdetailsSchema,'RESULTDETAIL'),
    Admin : db.model('Admin',adminSchema,'ADMIN'),
    McqReview : db.model('McqReview',mcqSchema,'MCQREVIEW'),
    CodingReview : db.model('CodingReview',codingSchema,'CODINGREVIEW'),
    GdReview : db.model('GdReview',gdScheme,'GDREVIEW'),
    TechHrReview : db.model('TechHrReview',techhrSchema,'TECHHRREVIEW'),
    PersonalHrReview : db.model('PersonalHrReview',personalhrScheme,'PERSONALHRREVIEW'),
    HackathonReview : db.model('HackathonReview',hackathonSchema,'HACKATHONREVIEW'),
}