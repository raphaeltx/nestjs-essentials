import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'New user',
    description: 'Cria usuário.',
  })
  @ApiBody({
    type: AuthCredentialsDto,
    required: true,
  })
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({
    summary: 'Login',
    description: 'Login.',
  })
  @ApiBody({
    type: AuthCredentialsDto,
    required: true,
  })
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
