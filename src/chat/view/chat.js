class ChatView {
    constructor(app, args)
    {
        this.app = app;
    }


    render()
    {
        this.workarea = this.app.create("dialog");
        this.workarea.Title = "mirrorjs Chat MVVM - Chat";
        this.workarea.Width = 660;
        this.workarea.Height = 410;
        this.workarea.DialogPosition = {at: "center"};

        this.txtMessage = this.app.create("textfield", this.workarea);
        this.txtMessage.Top = 325;
        this.txtMessage.Left = 5;
        this.txtMessage.Position = "absolute";
        this.txtMessage.Text = "";
        this.txtMessage.Width = 507;
        this.txtMessage.Height = 17;

        this.btnSend = this.app.create("button", this.workarea);
        this.btnSend.Top = 325;
        this.btnSend.Left = 520;
        this.btnSend.Position = "absolute";
        this.btnSend.Caption = "Send";
        this.btnSend.Width = 118;
        this.btnSend.Height = 21;

        this.txtChat = this.app.create("textfield", this.workarea, {MultiLine: true});
        this.txtChat.Top = 5;
        this.txtChat.Left = 5;
        this.txtChat.Position = "absolute";
        this.txtChat.Text = "";
        this.txtChat.Width = 505;
        this.txtChat.Height = 307;

        this.lstUsers = this.app.create("combobox", this.workarea);
        this.lstUsers.Name = "lstUsers";
        this.lstUsers.Top = 5;
        this.lstUsers.Left = 520;
        this.lstUsers.Position = "absolute";
        this.lstUsers.Listbox = true;
        this.lstUsers.Width = 120;
        this.lstUsers.Height = 313;
        this.lstUsers.Items = [];
    }
}


module.exports = ChatView;
