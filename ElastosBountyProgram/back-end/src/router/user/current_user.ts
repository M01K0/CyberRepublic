import Base from '../Base';
import UserService from '../../service/UserService';


export default class extends Base {
    protected needLogin = true;
    async action(){
        return this.result(1, this.session.user);
    }
}