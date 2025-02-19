import allowedOrigins from "./allowedOrigins.config";

const corsOptions = {
    origin: (origin: string, callback: any) => {
        if(allowedOrigins.includes(origin) || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
    }   

export default corsOptions