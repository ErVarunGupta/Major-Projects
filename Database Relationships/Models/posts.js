const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(()=>{console.log("connection successful!")})
.catch((err)=>{console.log(err)});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo")
}

const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async()=>{
    // let user1 = new User({
    //     username: "varunkumar",
    //     email: "varun@gmail.com"
    // });//already saved

    let user = await User.findOne({username: "varunkumar"});//extract id

    let post1 = new Post({
        content: "Buy Buy :",
        likes: 25
    });

    post1.user = user;

    // await user1.save();
    await post1.save();
}

// addData();

const getData = async()=>{
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);
}
getData();

const del = async()=>{
    await Post.findByIdAndDelete('678e84473968db66ce1145f1');

    // let res = await Post.find({});
    // console.log(res);
}
// del();

