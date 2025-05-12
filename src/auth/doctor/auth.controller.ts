import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { AuthDoctorService } from "./auth.service";

@Controller("auth/doctor")
export class AuthDoctorController {
  constructor(private readonly authService: AuthDoctorService) {}

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("sign-out")
  signout(
    @CookieGetter("doctor_refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("doctor_refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
