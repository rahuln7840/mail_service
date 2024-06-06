import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description: 'Enter your email',
    example: 'johndeo@gmail.com',
    required: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'Enter your email',
    example: 'Meeting Reminder',
    required: true,
  })
  @IsString()
  public subject: string;

  @ApiProperty({
    description: 'Enter your containt',
    example:
      'This is a friendly reminder about our upcoming meeting on [Date] at [Time]. We will be discussing [Meeting topic]. Please come prepared to discuss [Specific points for discussion]. If you have any questions in advance, please dont hesitate to reach out. See you there!',
    required: true,
  })
  @IsString()
  public content: string;
}
