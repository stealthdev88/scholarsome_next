import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";
import { sanitizationConfig } from "../../shared/sanitization/sanitization-config";

export class CreateCardDto {
  @ApiProperty({
    description: "The ID of the set that the card will belong to",
    example: "27758237-5f57-4f6c-b483-6161056dad76",
    minLength: 36,
    maxLength: 36,
  })
  @IsUUID("4")
  @IsNotEmpty()
  setId: string;

  @ApiProperty({
    description: "The index of the card in the set",
    example: 0,
    minimum: 0,
    maximum: 2147483647,
  })
  @IsNumber()
  @Min(0)
  @Max(2147483647)
  @IsOptional()
  index: number;

  @ApiProperty({
    description: 'The front or "term" of the card',
    example: "The definition of the card",
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
