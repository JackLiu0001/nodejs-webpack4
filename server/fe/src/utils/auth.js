import { getCookie } from 'jspath/common/utils';
const isLogin = () => {
    return getCookie('userName') !== '' ? true : false;
}
export default isLogin;