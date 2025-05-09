import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Markup, Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log(ctx);
    return this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    return this.botService.onStop(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
   return this.botService.onText(ctx)
  }
  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("text" in ctx.message!) {
  //     if (ctx.message.text == "hi") {
  //       await ctx.replyWithHTML("<b>Hello</b>");
  //     } else {
  //       await ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hey there");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.reply("Ertaga yordam beraman");
  // }

  // @Command("inline")
  // async onCommandInline(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Button 1",
  //         callback_data: "button_1",
  //       },
  //       {
  //         text: "Button 2",
  //         callback_data: "button_2",
  //       },
  //       {
  //         text: "Button 3",
  //         callback_data: "button_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 4",
  //         callback_data: "button_4",
  //       },
  //       {
  //         text: "Button 5",
  //         callback_data: "button_5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 6",
  //         callback_data: "button_6",
  //       },
  //     ],
  //   ];
  //   await ctx.reply("Kerakli tugmani tanlang:", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("button_1")
  // async onActionButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("button 1 bosildi");
  // }

  // @Action(/^button_\d+$/)
  // async onActionAnyButton(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const buttonData = await ctx.callbackQuery?.data;
  //     const id = buttonData.split("_")[1];
  //     await ctx.reply(`${id} Button bosildi`);
  //   }
  // }
  //

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
  //   }
  // }

  // @On("document")
  // async onDoc(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //       await ctx.reply(String(ctx.message.document));
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.replyWithVideo(String(ctx.message.video.file_id));
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithSticker(String(ctx.message.sticker.file_id));
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.latitude
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithVoice(ctx.message.voice.file_id);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   const mainKeyboard = [
  //     ["bir", "ikki", "uch"],
  //     ["tort", "besh"],
  //     ["olti"],
  //     [Markup.button.contactRequest("Telefon raqamingizni yuboring")],
  //     [Markup.button.locationRequest("Locatsiyangizni yuboring")],
  //   ];

  //   await ctx.reply("Kerakli main buttonni tanlang:", {
  //     ...Markup.keyboard(mainKeyboard),
  //   });
  // }

  // @Hears("bir")
  // async onHearsButtonBir(@Ctx() ctx: Context) {
  //   await ctx.reply("Main Button1 bosildi");
  // }
  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
  }
}
