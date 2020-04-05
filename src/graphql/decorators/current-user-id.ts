import { createParamDecorator } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
	(_, [_root, _args, ctx,  _info]) => ctx.req.user.userId,
);