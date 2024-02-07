import { BadRequestException } from "../common/exception/exception";

export function validationSchema<TShema, TDto>(schema: any, dto: TDto): void {
  const { error } = schema.validate(dto);

  if (error) {
    throw new BadRequestException(error.message);
  }
}
