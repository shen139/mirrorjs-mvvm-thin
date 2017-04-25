let MVVMEmit = require("../../utils/emit/emit");


class ChatModel extends MVVMEmit {
    constructor(app, args)
    {
        super();
        this.app = app;
        this.sharedObj = args.params.chat;
        this.userIsLoggedIn = false;
        this.nickname = null;
    }


    authenticate(nickname)
    {
        if (nickname.length === 0 || this.sharedObj.usersMap[nickname])
        {
            // nickname already logged in (or invalid)
            this.userIsLoggedIn = false;
            this.nickname = null;

            this.emit("invalidUser", true);
        }
        else
        {
            // validUser
            this.userIsLoggedIn = true;
            this.nickname = nickname;

            this.sharedObj.usersMap[nickname] = true;

            this.emit("validUser", true);

            this.app.broadcast.send("chat", "login", this.nickname);
        }
    }


    getLoggedUsers()
    {
        return Object.keys(this.sharedObj.usersMap).sort();
    }


    logout()
    {
        if (this.userIsLoggedIn && this.nickname && this.sharedObj.usersMap[this.nickname])
        {
            delete this.sharedObj.usersMap[this.nickname];

            this.app.broadcast.send("chat", "logout", this.nickname);
        }
    }


    sendMessage(msg)
    {
        this.app.broadcast.send("chat", "message", {
            from: this.nickname,
            msg
        });
    }
}


module.exports = ChatModel;
