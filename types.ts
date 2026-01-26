import React from 'react';

export type UnitType = 'typeA' | 'typeB';

export type PurchaseMethod = 'cash' | 'installments';

export interface LeadFormState {
  fullName: string;
  age: string;
  interestType: UnitType;
  purchaseMethod: PurchaseMethod;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  id: string;
  label: string;
  icon?: React.ReactNode;
}