import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    username:{type:String ,required:true},
    email:{type:String ,required:true,unique:true},
    pic:{type:String,default:"" },
    followers:[{type: Schema.Types.ObjectId, ref: "User", default: []  }],
    following:[{type: Schema.Types.ObjectId, ref: "User", default: []  }],
    bio:{type:String,default:"" },
    provider:{type: String, enum: ["credentials", "google"], required: true}
    
},{timestamps:true})


const tweetSchema=new Schema({
    content:{type:String,required:true},
    image:{type:String,default:""},
    authorId:{type:Schema.Types.ObjectId, ref: "User",required:true},
    likes:[{type:Schema.Types.ObjectId, ref: "User"}],
    comment:[{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
},{timestamps:true})

const commentSchema=new Schema({
    userId:{type: Schema.Types.ObjectId, ref: "User",required:true},
    comment:{type:String,required:true},
  
},{timestamps:true})


const userModel=mongoose.models.User ||mongoose.model("User",userSchema)
const tweetModel=mongoose.models.Tweet ||mongoose.model("Tweet",tweetSchema)
const commentModel=mongoose.models.Comment ||mongoose.model("Comment",commentSchema)

export{userModel,tweetModel,commentModel};