import bcrypt from 'bcrypt'


export const hashPassword = async (password) => {
    try {
        const salt = 10
        const hashedP = await bcrypt.hash(password, salt)
        return hashedP
    } catch (error) {
        console.log(error)
    }
};

export const comparePassword = async (password, hashedP) => {
    try {
        return bcrypt.compare(password, hashedP)
    } catch (error) {
        console.log(error)
    }
}