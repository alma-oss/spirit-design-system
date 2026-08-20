'use client';

import React from 'react';
import { Label, UNSTABLE_ComboboxOption } from '../..';

export type ComboboxLocationOption = { id: string; label: string };

export const COMBOBOX_LOCATION_OPTIONS: readonly ComboboxLocationOption[] = [
  { id: 'prague', label: 'Praha' },
  { id: 'brno', label: 'Brno' },
  { id: 'ostrava', label: 'Ostrava' },
  { id: 'plzen', label: 'Plzeň' },
  { id: 'liberec', label: 'Liberec' },
];

export const COMBOBOX_LOCATION_OPTION_KEYS = COMBOBOX_LOCATION_OPTIONS.map((option) => option.id);

/** Distance options mirror SplitTag LocationRadius demo. */
export const COMBOBOX_LOCATION_DISTANCES = ['+5 km', '+10 km', '+20 km', '+50 km'] as const;

export type ComboboxLocationDistance = (typeof COMBOBOX_LOCATION_DISTANCES)[number];

export const DEFAULT_LOCATION_DISTANCE: ComboboxLocationDistance = COMBOBOX_LOCATION_DISTANCES[0];

export const filterComboboxLocationOptions = (
  query: string,
  options: readonly ComboboxLocationOption[] = COMBOBOX_LOCATION_OPTIONS,
) => {
  const normalised = query.trim().toLowerCase();

  if (!normalised) {
    return [...options];
  }

  return options.filter((option) => option.label.toLowerCase().includes(normalised));
};

export const renderComboboxLocationItems = (options: readonly ComboboxLocationOption[] = COMBOBOX_LOCATION_OPTIONS) =>
  options.map((option) => (
    <UNSTABLE_ComboboxOption key={option.id} value={option.id}>
      <Label>{option.label}</Label>
    </UNSTABLE_ComboboxOption>
  ));
