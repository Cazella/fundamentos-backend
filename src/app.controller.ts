import { Body, Controller, Get, Param, Post, Put, Delete, Query, HttpCode } from '@nestjs/common';
import { z } from 'zod';
import { ZoddValidationPipe } from './pipes/zod-validation-pipe';

const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const createProducsBodySchema = z.object({
  name: z.string().min(5).max(20),
  modelo: z.string().min(3).max(10),
  dateManufacture: z.string().date(),
  year: z.number().min(1900).max(2025),
  brand: z.string().min(5).max(20),
  email: z.string().email(),
  cpf: z.string().regex(regex),
})
const bodyValidationPipe = new ZoddValidationPipe(createProducsBodySchema);

type CreateProductBodySchema = z.infer<typeof createProducsBodySchema>;

@Controller("/product")
export class AppController {

  products: CreateProductBodySchema[] = [
    {
      name: "SmartWatch",
      modelo: "SPX10",
      dateManufacture: "2024-05-10",
      year: 2024,
      brand: "TechGenius",
      email: "cliente1@example.com",
      cpf: "123.456.789-09"
    },
    {
      name: "Iphone",
      modelo: "16 Pro",
      dateManufacture: "2024-11-22",
      year: 2024,
      brand: "Apple",
      email: "cliente2@example.com",
      cpf: "987.654.321-00"
    }
  ];

  constructor() { }

  @Post()
  @HttpCode(201)
  create(@Body(bodyValidationPipe) Body: CreateProductBodySchema): string {
    return bodyValidationPipe.transform(Body);
  }

  @Get()
  get(): CreateProductBodySchema[] {
    return this.products;
  }

  @Put(':name')
  @HttpCode(200)
  update(@Param('name') name: string, @Body(bodyValidationPipe) body: CreateProductBodySchema): string {
    const productIndex = this.products.findIndex(product => product.name.toLowerCase() === name.toLowerCase());

    if (productIndex !== -1) {
      this.products[productIndex] = body;
      return "Produto atualizado com sucesso!";
    } else {
      return "Produto não encontrado.";
    }
  }

  @Delete(':name')
  @HttpCode(204)
  delete(@Param('name') name: string): string {
    const productIndex = this.products.findIndex(product => product.name.toLowerCase() === name.toLowerCase());

    if (productIndex !== -1) {

      this.products.splice(productIndex, 1);
      return "Produto removido com sucesso!";
    } else {

      return "Produto não encontrado.";
    }
  }
}