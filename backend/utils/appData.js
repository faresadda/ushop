class appData{
    constructor(){
    }
    createData(message,data){
        this.status= 'success';
        this.message=message;
        this.data=data;
        this.code=200;
        return this;
    }
}
module.exports=new appData()