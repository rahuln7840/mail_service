import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('generate')
  @ApiResponse({
    status: 201,
    description: 'The email is successfully generated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The provided data is not valid.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal Server Error. There was a problem with the server, please try again later.',
  })
  @ApiOperation({
    summary: 'email-generate for reset password',
    description: 'Endpoint to generate OTP.',
  })
  async sendEmail(@Body() dto: EmailDto) {
    return await this.emailService.generateEmail(dto);
  }
}
