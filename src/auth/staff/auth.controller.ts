import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { AuthStaffService } from "./auth.service";

@Controller("auth/staff")
export class AuthStaffController {
  constructor(private readonly authService: AuthStaffService) {}

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
    @CookieGetter("staff_refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("staff_refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
