import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.paymentModel.findByPk(id);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
  }

 async remove(id: number) {
    const deleted = await this.paymentModel.destroy({ where: { id } });
    if (deleted > 0) {
      return { message: `${id}-payment was deleted successfully` };
    }
    return { message: `Payment not found` };
  }
}
