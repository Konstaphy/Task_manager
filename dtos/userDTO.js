module.exports = class UserDTO {
    user_id
    username
    email
    role

    constructor(model) {
        this.user_id = model.user_id
        this.username = model.username
        this.email = model.email
        this.role = model.role
    }
}