import { ApiProperty } from "@nestjs/swagger";
import { SetSetsEntity } from "../set.sets.entity";

export class SetsSuccessResponse {
  @ApiProperty({
    description: "Denotes whether the request was successful or not",
    example: "success"
  })
    status: string;

  @ApiProperty({
    description: "Response data",
    type: [SetSetsEntity]
  })
    data: SetSetsEntity;
}
