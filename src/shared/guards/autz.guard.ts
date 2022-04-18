import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';
import { Request } from 'express';
import { UpdateUserInput } from 'src/core/user/dto/update-user.input';
import { UserService } from 'src/core/user/user.service';

@Injectable()
export class AutzGuard implements CanActivate {

  constructor(private userService: UserService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    context.switchToHttp()

    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context)

      let { updateUserInput } = ctx.getContext().req

      return this.checkToken(updateUserInput)
    }

    return false;
  }

  private async checkToken(updateUserInput: UpdateUserInput): Promise<boolean> {
    const userToken = await this.userService.getToken(updateUserInput.id)

    return userToken === updateUserInput.token
  }
}
