import { injectable, container } from "tsyringe";

@injectable()
export default class UserModel{
    
}

export const registerUserModelDI = () => {
    container.register(UserModel.name, {useClass: UserModel})
}
