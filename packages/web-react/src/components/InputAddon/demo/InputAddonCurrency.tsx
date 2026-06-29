import React from 'react';
import { InputContainer } from '../../InputContainer';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import { VisuallyHidden } from '../../VisuallyHidden';
import InputAddon from '../InputAddon';

const InputAddonCurrency = () => (
  <>
    <Stack spacing="space-400">
      <Label htmlFor="input-addon-currency-eur">Amount</Label>
      <InputContainer size="medium">
        <InputAddon elementType="label" htmlFor="input-addon-currency-eur">
          <span aria-hidden="true">€</span>
          <VisuallyHidden>in EUR</VisuallyHidden>
        </InputAddon>
        <input
          type="text"
          id="input-addon-currency-eur"
          name="inputAddonCurrencyEur"
          placeholder="0,00"
          inputMode="decimal"
          autoComplete="transaction-amount"
        />
      </InputContainer>
    </Stack>

    <Stack spacing="space-400">
      <Label htmlFor="input-addon-currency-usd">Amount</Label>
      <InputContainer size="medium">
        <InputAddon elementType="label" htmlFor="input-addon-currency-usd">
          <span aria-hidden="true">$</span>
          <VisuallyHidden>in USD</VisuallyHidden>
        </InputAddon>
        <input
          type="text"
          id="input-addon-currency-usd"
          name="inputAddonCurrencyUsd"
          placeholder="0.00"
          inputMode="decimal"
          autoComplete="transaction-amount"
        />
      </InputContainer>
    </Stack>

    <Stack spacing="space-400">
      <Label htmlFor="input-addon-currency-czk">Amount</Label>
      <InputContainer size="medium">
        <input
          type="text"
          id="input-addon-currency-czk"
          name="inputAddonCurrencyCzk"
          placeholder="0,00"
          inputMode="decimal"
          autoComplete="transaction-amount"
        />
        <InputAddon elementType="label" htmlFor="input-addon-currency-czk">
          <span aria-hidden="true">Kč</span>
          <VisuallyHidden>in CZK</VisuallyHidden>
        </InputAddon>
      </InputContainer>
    </Stack>
  </>
);

export default InputAddonCurrency;
