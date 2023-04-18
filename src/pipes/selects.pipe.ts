import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SelectsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return;
    const selects = value
      .split(',')
      .filter((v) => v.trim())
      .reduce((selects, key) => {
        selects[key] = true;
        return selects;
      }, {});
    return selects;
  }
}
