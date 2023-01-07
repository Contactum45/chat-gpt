import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  username: {
     type: String,
     require: true
  },
  email: {
     type: String,
     require: true,
     unique: true,
  },
  hash_password: {
     type: String,
     require: true,
  },
},{ timestamps: true });
// //For get fullName from when we get data from database
// userSchema.virtual("username").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });
userSchema.method({
  async authenticate(password) {
     return await bcrypt.compare(password, this.hash_password);
  },
});
export default mongoose.model("User", userSchema);