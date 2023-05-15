import { User } from "../../models/user"

export interface MeQuerySuccessResult {
    data: {
        user: User
    }
    status: string
}