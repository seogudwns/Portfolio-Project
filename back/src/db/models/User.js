import { UserModel } from "../schemas/user";

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filteredById = { id: user_id };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedUser;
    }

    static async searchingByPiece({ pieceword }) {
        const searchingUser = await (
            await UserModel.find()
        ).filter((data) => data.name.includes(pieceword));

        return searchingUser;
    }

    static async searchingByPiece2({ pieceword }) {
        const searchingUser = await (
            await UserModel.find()
        ).filter((data) => data.email.includes(pieceword));

        return searchingUser;
    }

    static async deleteById({ user_id }) {
        const deletdUser = await UserModel.deleteOne({ id: user_id });
        return deletdUser;
    }
}

export { User };
