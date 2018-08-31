import { City } from "../entity/City";
import { getRepository } from "typeorm";

export interface ICity {
    id?: number;
    name?: string;
}

class CityModel {
    getCity = (cty: ICity) => {
        let city = getRepository(City)
            .createQueryBuilder("city")
            .where("city.id = :id", { id: cty.id })
            .getOne();
        return city;
    };

    getCities = () => {
        let cities = getRepository(City)
            .createQueryBuilder("city")
            .getMany();
        return cities;
    };

    saveCity = async (cty: ICity) => {
        getRepository(City).save(cty);
        return 0;
    };
}

export default new CityModel();
