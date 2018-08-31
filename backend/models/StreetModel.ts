import { Street } from "../entity/Street";
import { getRepository } from "typeorm";

export interface IStreet {
    id?: number;
    name?: string;
}

class StreetModel {
    getStreet = (strt: IStreet) => {
        let street = getRepository(Street)
            .createQueryBuilder("street")
            .where("street.id = :id", { id: strt.id })
            .getOne();
        return street;
    };

    getStreets = () => {
        let streets = getRepository(Street)
            .createQueryBuilder("street")
            .getMany();
        return streets;
    };

    saveStreet = async (strt: IStreet) => {
        getRepository(Street).save(strt);
        return 0;
    };
}

export default new StreetModel();
