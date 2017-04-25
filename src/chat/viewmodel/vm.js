let LoginView = require("../view/login");
let ChatView = require("../view/chat");
let ChatModel = require("../model/model");


class ChatViewModel {
    constructor(app, args)
    {
        this.app = app;
        this.model = new ChatModel(app, args);
        this.loginView = new LoginView(app, args);
        this.chatView = new ChatView(app, args);

        // Model events' listeners
        this.model.on("validUser", (loggedIn) =>
        {
            if (loggedIn)
            {
                this.showChat();
            }
        });

        this.model.on("invalidUser", (loggedIn) =>
        {
            this.loginView.lblInfoline.Caption = "nickname already logged in!";

            setTimeout(() => this.loginView.lblInfoline.Caption = "", 3000);
        });

        // Show login form
        this.showLogin();
    }


    /**
     * onClose
     *  On application close
     *  (called by mirrorjs framework when the app exits or when the connection goes down)
     *
     */
    onClose()
    {
        this.exit();
    }


    exit()
    {
        this.model.logout();
        this.app.exit();
    }


    showLogin()
    {
        this.loginView.render();
        this.loginView.txtNickname.focus();

        // View events' listeners
        this.loginView.txtNickname.on("keypress", (myself, e) =>
        {
            if (e.keyCode === 13)
            {
                this.authenticate();
            }
        });
        this.loginView.btnLogin.on("click", () => this.authenticate());

        this.loginView.workarea.on("beforeclose", () => this.exit());
    }


    showChat()
    {
        if (this.loginView.workarea)
        {
            this.loginView.workarea.destroy();
            this.loginView.workarea = null;
        }

        this.chatView.render();

        this.chatView.lstUsers.Items = this.model.getLoggedUsers().map((user) =>
        {
            return {
                key: user,
                value: user
            }
        });

        this.chatView.txtMessage.focus();

        // View events' listeners
        this.chatView.txtMessage.on("keypress", (myself, e) =>
        {
            if (e.keyCode === 13)
            {
                this.sendMessage();
            }
        });
        this.chatView.btnSend.on("click", () => this.sendMessage());

        this.chatView.workarea.on("beforeclose", () => this.exit());

        this.broadcastListener();
    }


    /**
     * broadcastListener
     *  Messages listener
     *
     */
    broadcastListener()
    {
        this.app.broadcast.onmessage((eventGroup, eventName, obj) =>
        {
            if (eventGroup === "chat")
            {
                switch (eventName)
                {
                    case "login":
                        this.userListAdd(obj);
                        break;
                    case "logout":
                        this.userListDel(obj);
                        break;
                    case "message":
                        this.addMessage(obj.from, obj.msg);
                        break;
                }
            }
        });
    }


    authenticate()
    {
        this.loginView.txtNickname.getText((self, ret, val) =>
        {
            this.model.authenticate(val);
        });
    }


    sendMessage()
    {
        this.chatView.txtMessage.getText((self, ret, val) =>
        {
            if (val.length > 0)
            {
                this.addMessage(this.model.nickname, val);
                this.model.sendMessage(val);
                this.chatView.txtMessage.Text = "";
                this.chatView.txtMessage.focus();
            }
        });
    }


    addMessage(from, msg)
    {
        if (this.chatView.workarea && this.chatView.txtChat)
        {
            this.chatView.txtChat.Text += `${from}: ${msg}\n`;
        }
    }


    userListAdd(username)
    {
        if (this.chatView.workarea && this.chatView.lstUsers)
        {
            this.chatView.lstUsers.addItem(username, username);
        }
    }


    userListDel(username)
    {
        if (this.chatView.workarea && this.chatView.lstUsers)
        {
            this.chatView.lstUsers.removeItem(username);
        }
    }
}


module.exports = ChatViewModel;
