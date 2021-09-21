

export class User {

    public email: string;
    public id: string;
    private _token:string;
    private _tokenExpirationDate:Date;
    constructor( email:string,id:string,_token:string,_tokenExpirationDate:Date) { 
        this.email = email;
        this.id = id;
        this._token = _token;
        this._tokenExpirationDate = _tokenExpirationDate;
    }

    get token() {
        if( !this._tokenExpirationDate && this._tokenExpirationDate < new Date() ) {
            return null;
        }
        else {
            return this._token;
        }
    }

}