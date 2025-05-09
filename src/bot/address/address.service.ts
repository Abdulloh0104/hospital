import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "../model/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { Context, Markup, Telegraf } from "telegraf";
import { BOT_NAME } from "../../app.constance";
import { Address } from "../model/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}
  async onAddress(ctx: Context) {
    try {
      await ctx.replyWithHTML("Manzil bo'yicha kerakli ma'lumotlar", {
        ...Markup.keyboard([
          ["Mening manzilarim", "Yangi manzil qo'shish"],
        ]).resize(),
      });
    } catch (error) {
      console.log(`error on Address`, error);
    }
  }

  async onNewAddress(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(),
        });
      }

      await this.addressModel.create({
        user_id: user_id!,
        last_state: "name",
      });
      await ctx.replyWithHTML("Yangi manzil nomini kiriting", {
        ...Markup.removeKeyboard(),
      });
    } catch (error) {   
      console.log(`error on Address`, error);
    }
  }
}
