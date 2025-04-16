import { Injectable } from "@nestjs/common"

interface Product{
    id: number,
    name: string,
    modelo: string,
    dateManufacture: string,
    year: number,
    brand: string,
    email: string,
    cpf: string

}

interface CreateProductServiceRequest{
    id: number,
    name: string,
    modelo: string,
    dateManufacture: string,
    year: number,
    brand: string,
    email: string,
    cpf: string
}

type CreateProductServiceResponse = {
    product: Product;
}

@Injectable()
export class CreateProductService {

    constructor(){}

    async execute ({
        brand,
        cpf,
        dateManufacture,
        email,
        modelo,
        name,
        year
    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse>{
        return null;
    }
}





