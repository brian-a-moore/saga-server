const { User} = require('../../../models');
const { messages } = require('../../../utils');
const bcrypt = require('bcrypt');

module.exports = async (userId, { password, pin }) => {
    if(!password && !pin) return { message: null, granted: true, status: null };
    else {
        try {
            let user = await User.findOne({ attributes: ['password', 'pin'], where: { userId }});
            if(password) {
                let result = await bcrypt.compare(password, user.password);
                if(result) return { message: messages.permission.samePassword, granted: false, status: 422 };  
            }
            else if(pin && pin === user.pin) return { message: messages.permission.samePin, granted: false, status: 422 };
            else return { message: null, granted: true, status: null };  
        } catch(e) {
            console.log({ e });
            process.exit();
        }
   
    }
};