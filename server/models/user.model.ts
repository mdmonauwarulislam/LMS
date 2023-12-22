import mongoose,{Document,Model,Schema} from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const passwordRegexPattern:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar:{
        public_id:string;
        url:string;
    },
    role:string;
    isVerified:boolean;
    courses:Array<{courseID: string}>;comparePassword: (password: string) => Promise<boolean>;
};

const userSchema:Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        match: [emailRegexPattern, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        // match: [passwordRegexPattern, 'Please enter a valid password'],
        minlength: [8, 'Your password must be longer than 8 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            courseID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

// hash password before saving user
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// compare user password

userSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel:Model<IUser> = mongoose.model('User', userSchema);

export default UserModel;