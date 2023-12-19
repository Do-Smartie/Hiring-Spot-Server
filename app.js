const express = require('express')
const app = express()
const cookieParser = require('cookie-parser') 
const bodyParser = require('body-parser')
const logger = require('./Routes/User_login')
const register = require('./Routes/User_register')
const jdadder = require('./Routes/admin_addcompanyjd')
const session = require("express-session")
const adder = require('./Routes/admin_addcompanydetails')
const companyregister = require('./Routes/user_companyregistration')
const companyshower = require('./Routes/admin_showcompanies')
const companydetailsshower = require('./Routes/admin_showcompanydetails')
const usershower = require('./Routes/admin_showstudentusers')
const userdetailsshower = require('./Routes/admin_showstudentuserdetails')
const addresulter = require('./Routes/admin_addresultdetails')
const resultfileadder = require('./Routes/admin_addresultfile')
// const downloaders = require('./Routes/download')
const jddownloader = require('./Routes/jd_download')
const resultdownloader = require('./Routes/result_download')
const homeshower = require('./Routes/homepage')
const profileeditor = require('./Routes/useredit_profile')
const companyeditor = require('./Routes/admin_editcompany')
const facultyshower = require('./Routes/admin_showfaculties')
const facultydetailsshower = require('./Routes/admin_showfacultydetails')
const userdeleter = require('./Routes/deletenyuser')
const companydeleter = require('./Routes/admin_deletecompany')
const profileshower = require('./Routes/profileshower')
const logouter = require('./Routes/logout')
const passwordprovider = require('./Routes/forgot_password')
const countshower = require('./Routes/admin_countdetails')
const typeprovider = require('./Routes/usertype')
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors')
var cookieSession = require('cookie-session')
const dummydownloader = require('./Routes/dummydownload')
require("dotenv").config();


const {Jd, HackathonReview} = require('./Database/schema.js')
const dbConfig = require("./Config/db.js");
const resultdetailsadder = require('./Routes/pc_addresultdetails')
const completedcompanyshower = require('./Routes/admin_showcompletedcompanies')
const completedcompanydetailsshower = require('./Routes/admin_showcompletedcompanydetails')
const homecountshower = require('./Routes/homecount')
const homecompletedcompanyshower = require('./Routes/home_completedcompanydetails')
const cgpaenabler = require('./Routes/pc_enableedit')
const cgpadisabler = require('./Routes/pc_disableedit')
const adminadder = require('./Routes/add_admin')
const kcompanycompanyprovider = require('./Routes/admin_getcompany(K)')
const rolepackageprovider = require('./Routes/admin_getrolepackage(K)')
const studentprovider = require('./Routes/admin_getstudents(k)')
const review_companyprovider = require('./Routes/student_getcompany(review)')
const review_rolepackageprovider = require('./Routes/student_getrolepackage(review)')
const mcqReviewAdder = require('./Routes/add_mcqreview')
const codingreviewAdder = require('./Routes/add_codingreview')
const gdReviewAdder = require('./Routes/add_gdreview')
const techhrreviewadder = require('./Routes/add_techhrreview')
const hackathonreviewadder = require('./Routes/add_hackathonreview')
const personalhrreviewAdder = require('./Routes/add_personalhrreview')
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;


const url = dbConfig.url;
const mongoClient = new MongoClient(url);


// var store = new MongoDBStore(
//     {
//       uri: 'mongodb://127.0.0.1:27017/',
//       databaseName: 'SECE_PLACEMENTS',
//       collection: 'SESSIONS',
//     },
//     function(error) {
//       // Should have gotten an error
//       // console.log(error)
//     });

const SESSION_TIME = 60*60*60*24

const{
    PORT = 5000,
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'Its Sessions Secret',
    SESSION_LIFETIME = SESSION_TIME
}=process.env

app.use("*",cors({
  origin : true,
  credentials:true
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

// app.use(cookieSession({
//     name : SESSION_NAME,
//     secret : SESSION_SECRET,
//     saveUninitialized : false,
//     resave : false,
//     store : store,
//     expires : SESSION_LIFETIME
//     // cookie : {
//     //     // maxAge : SESSION_LIFETIME,
//     //     httpOnly : false,
//     //     // sameSite: "none",
//     //     secure : false
//     // }
// }))



//  Route for Logging in by Application Users - // Verified - Success
app.use('/sece/user/login',logger)


//  Route for Registration by Application Users - // Verified - Success
app.use('/sece/user/register',register)


//  Route for Adding Company Details by Admin - // Verified - Success
app.use('/sece/admin/addcompanydetails',adder) 


// Route for Adding JD for a Particular Company by Admin - // Verified - Success
app.use('/sece/admin/uploadcompanyjd',jdadder)


// Route for Showing Company Registration Count and Registered Student Details by Admin
app.use('/sece/admin/dashboard/counts',countshower)



// Route for Company Registration by Users - // Verified - Success
app.use('/sece/user/registercompany',companyregister)


// Route for Showing the Available Company(Names) as per the batch by Admin - // Verified - Success
app.use('/sece/admin/showpiplinedcompanies',companyshower) 


// Route for Showing the Company Whole Details and Registered Student Details - // Verified - Success
app.use('/sece/admin/showregisteredstudents',companydetailsshower)


// Route for Showing the Available User(Names) as per the bacth by Admin - // Verified - Success
app.use('/sece/admin/showusers',usershower)


// Route for Showing the User Whole details - // Verified - Success
app.use('/sece/admin/showuserdetails',userdetailsshower)


// Route for adding result details by Admin - // Verified - Success
app.use('/sece/admin/addresultdetails',addresulter)


// Route for adding result file by Admin - // Verified - Success
app.use('/sece/admin/uploadresultfile',resultfileadder)


// Route for Downloading JD file for an company by Admin and User - // Verified - Success
app.use('/sece/user/jdfiledownload',jddownloader)


// Route for Downloading Result file for an compant by Admin and User - // Verified - Success
app.use('/sece/user/resultdownload',resultdownloader)


// Route for Home Page - // Verified - Success
app.use('/sece/placements/companies',homeshower)


// Route for Editing Profile by both Admin and Users - // Verified - Success
app.use('/sece/user/editprofile',profileeditor)
// app.use('/admin/editprofile',profileeditor)


// Routes for Editing Company Details by Admin - // Verified - Success
app.use('/sece/admin/editcompany',companyeditor)


// Route for Showing Available Faculties by Admin - // Verified - Success
app.use('/sece/admin/facultydetails',facultyshower)


// Route for showing faculty details(whole) by Admin - // Verified - Success
app.use('/admin/facultydetails/shower',facultydetailsshower)


// Route for deleting an account by Admin and User - // Verified - Success
// app.use('/admin/delete/account',userdeleter)
app.use('/sece/user/delete/account',userdeleter)


// Route for deleting an company details by Admin - // Verified - Success
app.use('/admin/company/deleter',companydeleter) 


// Route for Showing Profile by Users - // Verified - Success
app.use('/sece/user/profile',profileshower)


// Route for User Logout
app.use('/sece/user/logout',logouter)


// Route for Forgot Password - // Verified - Success
app.use('/sece/user/forgotpassword',passwordprovider)


// Route for Getting User Type - // Verfied - Success
app.use('/sece/user/type',typeprovider)


// Route for Adding Result Details by the PC
app.use('/sece/pc/addplaceddetails',resultdetailsadder)


// Route for Showing Completed Company Shower by Admin
app.use('/sece/admin/showcompletedcompanies',completedcompanyshower)


// Route for Showing Placed Student details in Completed Companies
app.use('/sece/admin/showplacedstudents',completedcompanydetailsshower)


// Route for Showing Home Page Details
app.use('/sece/users/home/counts',homecountshower)


// Route for Showing Company Details in Home Page
app.use('/sece/users/home/completedcompanydetails',homecompletedcompanyshower)


// Route for Enabling Edit Option by Faculty PC
app.use('/sece/facultypc/profile/enablecgpaupdate',cgpaenabler)



// Route for Disabling Edit Option by Faculty PC
app.use('/sece/facultypc/profile/disablecgpaupdate',cgpadisabler)


// Route for Adding Admin Details by Developer
app.use('/sece/developer/add/admin',adminadder)


// Route for Giving Company Details - batch provided (k)
app.use('/sece/admin/getcompanynamesforaddplacedpalcedstudentspage',kcompanycompanyprovider)


// Route for Giving Company Role and Package (k)
app.use('/sece/admin/getcompanydetailsforaddplacedstudentspage',rolepackageprovider)


// Route for Giving Student Details (K)
app.use('/sece/admin/getstudentdetailsfotaddplacedstudentspage',studentprovider)


// Route for Giving Company Details for Review
app.use('/sece/students/getcompanynamesforfeedback',review_companyprovider)


// Route for Giving Role and Package Details of an Company for Review
app.use('/sece/students/getcompanydetailsforfeedback',review_rolepackageprovider)


// Route for Adding MCQ Round Review Details
app.use('/sece/students/addaptireview',mcqReviewAdder)


// Route for Adding Coding Round Review Details
app.use('/sece/students/addcodingroundreview',codingreviewAdder)


// Route for Adding GD Round Review Details
app.use('/sece/students/addgdreview',gdReviewAdder)


// Route for Adding Techincal HR Round Review Details
app.use('/sece/students/addtechhrreview',techhrreviewadder)


// Route for Adding Hackathon Rounf Review Details
app.use('/sece/students/addhackathonreview',hackathonreviewadder)


// Route for Adding Personal HR Round Review Details
app.use('/sece/students/addpersonalhrreview',personalhrreviewAdder)


app.use('/sece/download/:name',(req,res)=>{
   try{
        const gname = req.params.name
        console.log('gere')
        if(!gname){
            console.log(gname)
        }else{
            // const generatedfilename = Jdfiledetails[0].JD_Available[0].Generated_Filename


            const download = async (name) => {

                await mongoClient.connect();
            
                const database = mongoClient.db(dbConfig.database);
                const bucket = new GridFSBucket(database, {
                bucketName: dbConfig.Bucket,
                });
            
                let downloadStream = bucket.openDownloadStreamByName(name);

            
                downloadStream.on("data", function (data) {
                  return res.status(200).write(data);
                });
            
            
                downloadStream.on("error", function (err) {
                  console.log(err)
                  return res.status(404).json({ Success : false, Message: "Cannot download the File!" });
                });
            
                downloadStream.on("end", () => {
                  return res.end();
                });
            };
            download(gname)


        }
       
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an error in downloading the JD File of this Company..."
        })
    }
})


app.use('/sece/results/:name',(req,res)=>{
  try{
    const gname = req.params.name
    console.log('gere')
    console.log(gname)
    if(!gname){
        console.log(gname)
    }else{
        // const generatedfilename = Jdfiledetails[0].JD_Available[0].Generated_Filename


        const download = async (name) => {

            await mongoClient.connect();
        
            const database = mongoClient.db(dbConfig.database);
            const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.Bucket,
            });
        
            let downloadStream = bucket.openDownloadStreamByName(name);

        
            downloadStream.on("data", function (data) {
              return res.status(200).write(data);
            });
        
        
            downloadStream.on("error", function (err) {
              console.log(err)
              return res.status(404).json({ Success : false,Message: "Cannot download the File!" });
            });
        
            downloadStream.on("end", () => {
              return res.end();
            });
        };
        download(gname)
    }
  
    }catch(error){
        console.log(error)
        res.status(404).json({
            Success : false,
            Message : "There is an error in downloading the Result File of this Company..."
        })
    }
})

app.listen(process.env.PORT,()=>{
    console.log('Server Listening to Port Number 5000...')
})



// show company details and user details
// show companies
// show users
// edit company 