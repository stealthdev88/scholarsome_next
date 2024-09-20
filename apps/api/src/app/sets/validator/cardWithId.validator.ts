import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";
import { ApiProperty } from "@nestjs/swagger";
import { sanitizationConfig } from "../../shared/sanitization/sanitization-config";

export class CardWithIdValidator {
  /*
  cannot include @IsUUID with this because it's optional
   */
  @ApiProperty({
    description: "The ID of the card",
    example: "27758237-5f57-4f6c-b483-6161056dad76",
    maxLength: 36,
    minLength: 36,
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: "The index of the card in the set",
    example: 0,
    minimum: 0,
    maximum: 2147483647,
  })
  @IsNumber()
  @Min(0)
  @Max(2147483647)
  @IsNotEmpty()
  index: number;

  @ApiProperty({
    description: 'The front or "term" of the card',
    example: "The term of the card",
  })
  @IsString()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) =>
    sanitizeHtml(params.value, sanitizationConfig)
  )
  term: string;

  @ApiProperty({
    description: 'The back or "definition" of the card',
    example: "The definition of the card",
  })
  @IsString()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) =>
    sanitizeHtml(params.value, sanitizationConfig)
  )
  definition: string;
}
