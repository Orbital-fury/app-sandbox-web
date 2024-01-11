import { formatCurrency, getCurrencySymbol, registerLocaleData } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@Pipe({
  name: 'euroCurrency',
})
export class CurrencyPipeComponent implements PipeTransform {

  transform(value: number,
    currencyCode: string = 'EUR',
    display:
      | 'code'
      | 'symbol'
      | 'symbol-narrow'
      | string
      | boolean = 'symbol',
    digitsInfo: string = '1.2-2',
    locale: string = 'fr'): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo
    );
  }

}
