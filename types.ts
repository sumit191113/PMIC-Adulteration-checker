import { LucideIcon } from 'lucide-react';

export interface TestProcedure {
  aim: string;
  materials: string[];
  procedure: string[];
  observation: string;
  conclusion: string;
  precautions: string[];
}

export interface Adulterant {
  id: string;
  name: string;
  test?: TestProcedure; // Optional because custom inputs won't have it immediately
}

export interface FoodItem {
  id: string;
  name: string;
  icon?: LucideIcon;
  adulterants: Adulterant[];
}

export interface Report {
  id: string;
  reporterName: string;
  foodName: string;
  adulterantName: string;
  brandName?: string;
  dateOfPurchase?: string;
  dateOfSubmission: string;
  observation: string;
  imageBase64?: string;
}

export interface FavoriteItem {
  id: string;
  foodName: string;
  adulterantName: string;
  test: TestProcedure;
  timestamp: number;
}

export enum AppScreen {
  HOME = 'HOME',
  SELECT_FOOD = 'SELECT_FOOD',
  SELECT_ADULTERANT = 'SELECT_ADULTERANT',
  TEST_DETAILS = 'TEST_DETAILS',
  FAVORITES = 'FAVORITES',
}