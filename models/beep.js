const {authRester:rester} = require("./users")

// This is where we define the data stored in a Beep
const [Beep, beepRouter] = rester("Note", { 
    body: String,
    url: String,
    username: {type: String, required: true}  });

// Export the beep model and router
module.exports = {Beep, beepRouter}