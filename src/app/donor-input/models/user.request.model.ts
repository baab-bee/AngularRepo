import { User } from './user.model';


export class UserRequest {
    userRequestType: String = 'D';
    totalOrderedQty: Number;
    remarks: String;
    createdDate:Date=new Date();
    user: User;
}