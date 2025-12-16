export class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.username = '#username';
        this.password = '#password';
        this.loginBtn = 'button[type="submit"]';
    }

    async open()
    {
        await this.page.goto('https://the-internet.herokuapp.com/');
    }

    async login(user, pass)
    {
        await this.page.fill(this.username, user);
        await this.page.fill(this.password, pass);
        await this.page.click(this.loginBtn);
    }
}