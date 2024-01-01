import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrencyConversionService } from './mainframe.service';

@Component({
  selector: 'app-frame',
  templateUrl: 'mainframe.component.html',
  styleUrls: ['mainframe.component.css']
})
export class MainframeComponent {
  swapButtonClicked = false;
  form: FormGroup;
  allCurrencies = [
    { value: 'USD', label: 'USA (USD)' },
    { value: 'EUR', label: 'EUROPEAN UNION (EUR)' },
    { value: 'INR', label: 'India (INR)' },
    // Add more currencies as needed
  ];

  fromCurrencies = [...this.allCurrencies];
  toCurrencies = [...this.allCurrencies];
  exchangeRate: number | undefined;


  constructor(private fb: FormBuilder , private currencyConversionService : CurrencyConversionService) {
    this.form = this.fb.group({
      fromCurrency: [this.fromCurrencies[0].value, Validators.required],
      fromAmount: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      toCurrency: [this.toCurrencies[1].value, Validators.required],
      toAmount: [{ value: null, disabled: true }],
    });

  }

  clearFields() {
    this.form.reset();
  }

  isFormValid(): boolean {
    return this.form.get('fromAmount')?.value !== null && this.form.valid;
  }

  swapCurrencies() {
    this.swapButtonClicked = true;
    const fromCurrency = this.form.get('fromCurrency')?.value;
    const toCurrency = this.form.get('toCurrency')?.value;

    if (fromCurrency === toCurrency) {
      // You can display a message to the user or handle it as needed
      console.log('Cannot swap identical currencies.');
      return;
    }

    // Swap the currencies directly in the form control
    this.form.get('fromCurrency')?.setValue(toCurrency);
    this.form.get('toCurrency')?.setValue(fromCurrency);

    // Update available currencies based on the selected ones
  }

  updateAvailableCurrencies() {
    // Get the selected currencies
    const fromCurrency = this.form.get('fromCurrency')?.value;
    const toCurrency = this.form.get('toCurrency')?.value;

    // Remove the selected currencies from the available options
    this.fromCurrencies = this.allCurrencies.filter(currency => currency.value !== toCurrency);
    this.toCurrencies = this.allCurrencies.filter(currency => currency.value !== fromCurrency);
  }

  getExchangeRate() {
    const fromAmount = this.form.get('fromAmount')?.value;
    const fromCurrency = this.form.get('fromCurrency')?.value;
    const toCurrency = this.form.get('toCurrency')?.value;

    this.currencyConversionService.getExchangeRate(fromAmount,fromCurrency, toCurrency)
      .subscribe(rate => {
        this.form.get('toAmount')?.setValue(rate);
        console.log(`Exchange rate from ${fromCurrency} to ${toCurrency}: ${rate}`);
      });
  }
}
