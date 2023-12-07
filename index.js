import {initializeApp,applicationDefault} from "firebase-admin/app";
import {getMessaging} from "firebase-admin/messaging";
import express,{json} from "express";
var serviceAccount = require("path/to/serviceAccountKey.json");
import cors from 'cors';

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());


app.use(function(req, res, next) {
    res.setHeader('content-type', 'application');
    next();
});

app.use(
    cors({
        origin: "*",
    })
);

app.use(cors({
    methods: ['GET',"POST","DELETE","UPDATE","PUT","PATCH"],
}));
initializeApp({
  credential: applicationDefault,
  projectId: 'potion-for-creators',
});

app.post("/send",function(req,res){
    const resevedToken = req.body.fcmTokem;
    const message = {
        notification: {
            title:"Notif",
            body: "This is A text Notification",
        },
        token: 'cztAUAWkT5Cf8A0hLMKtwZ:APA91bFaJ74dx3EhadZ9NiOfGColFrXfAOeTf-d08kJPUFAbt34xOHUgT0h2nK7ETJaq8bhRWqW8YUHjAMt9eNDJz9JFbnwfiYlTosUg2xVrfwCi7mnxq5JzFku0ny42E04fXSvHP58p',
    };
    getMessaging().send(message).then((response)=>{
        res.status(200).json({
            message : 'succes sent message',
            token : resevedToken,
        });
        console.log('secces sent message', response);
    }).catch((error)=>{
        res.status(400);
        res.send(error);
        console.log('error is ',error);
    });
});





app.listen(3000,function(){
    console.log("Server started on port 3000");
})


