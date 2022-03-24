import { OtherModel } from "../schemas/other";

class Other {
    //*생성
    static async create({ newOther }) {
        const createdNewOther = await OtherModel.create(newOther);

        return createdNewOther;
    }

    //*고유 아이디를 가진 기타모델을 불러옴.
    static async findById({ other_id }) {
        const other = await OtherModel.findOne({ id: other_id });

        return other;
    }

    //* 선언된 title을 가진 ((모든)) 기타모델을 불러옴.
    static async findByTitle({ 
        title, 
        user_id,
    }) {
        const others = await OtherModel.find({ 
            title, 
            user_id,
        });

        return others;
    }

    //* 선언된 user_id를 가진 ((모든)) 기타모델을 불러옴.
    static async findByUserId({ user_id }) {
        const others = await OtherModel.find({ user_id });
        return others;
    }

    //* 고유 id를 통해 기타모델 업데이트.
    static async update({ 
        other_id, 
        fieldToUpdate, 
        newValue,
    }) {
        const filter = { id: other_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedOther = await OtherModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedOther;
    }

    static async removeById({ other_id }) {
        const deleteone = await OtherModel.deleteOne({ id: other_id });

        return deleteone;
    }
}

export { Other };
