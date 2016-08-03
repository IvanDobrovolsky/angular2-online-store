//TODO Restrict dir property
interface IOptions {
    body: string,
    icon: string,
    dir:  string //['auto', 'ltr', 'rtl'] 1 of the array values (either auto, or ltr, or rtl)}
}

export class Notification {
    public title: string;
    public options : IOptions;

    constructor(title, options) {
        this.title   = title;
        this.options = options;
    }
}