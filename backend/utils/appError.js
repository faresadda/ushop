class appError extends Error{
    constructor(){
        super()
    }
    createError(code,message,data){
        this.status= code === 404 ? 'error' : 'fail';
        this.message=message;
        this.code=code;
        this.data=data
        return this;
    }
}
module.exports=new appError()
