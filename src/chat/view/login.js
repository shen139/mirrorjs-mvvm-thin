class LoginView {
    constructor(app, args)
    {
        this.app = app;
    }


    render()
    {
        this.workarea = this.app.create("dialog");
        this.workarea.Title = "mirrorjs Chat MVVM - Login";
        this.workarea.Width = 335;
        this.workarea.Height = 195;
        this.workarea.DialogPosition = {at: "center"};
        this.workarea.on("beforeclose", () => this.app.exit());

        this.label1 = this.app.create("label", this.workarea);
        this.label1.Top = 10;
        this.label1.Left = 10;
        this.label1.Position = "absolute";
        this.label1.Caption = "nickname";
        this.label1.Width = 60;
        this.label1.Height = 22;

        this.btnLogin = this.app.create("button", this.workarea);
        this.btnLogin.Name = "btnLogin";
        this.btnLogin.Top = 35;
        this.btnLogin.Left = 130;
        this.btnLogin.Position = "absolute";
        this.btnLogin.Caption = "Login";
        this.btnLogin.Width = 100;
        this.btnLogin.Height = 22;

        this.txtNickname = this.app.create("textfield", this.workarea);
        this.txtNickname.Top = 35;
        this.txtNickname.Left = 10;
        this.txtNickname.Position = "absolute";
        this.txtNickname.Text = "";
        this.txtNickname.Width = 100;
        this.txtNickname.Height = 17;

        this.lblInfoline = this.app.create("label", this.workarea);
        this.lblInfoline.Top = 80;
        this.lblInfoline.Left = 10;
        this.lblInfoline.Position = "absolute";
        this.lblInfoline.Caption = "";
        this.lblInfoline.Width = 60;
        this.lblInfoline.Height = 22;
    }
}


module.exports = LoginView;
