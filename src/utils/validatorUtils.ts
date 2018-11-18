import { i18nMark } from '@lingui/react';
import Yup from 'yup';

export const upperCaseRegex = /(?=.*[A-Z])/;
export const lowerCharRegex = /(?=.*[a-z])/;
export const specialCharRegex = /(?=.*[$@$!%*?&#^_-])/;
export const digitCharRegex = /(?=.*\d)/;
export const noSpaceRegex = /^\S*$/;
export const complexityRegex = /[A-Za-z\d$@$!%*?&#^_-]/;

export const YupPasswordValidator = Yup.string()
  .required(i18nMark('Password is required'))
  .min(7, i18nMark('Password must be at least 7 characters'))
  .matches(noSpaceRegex, i18nMark('Blank spaces are not allowed'))
  .matches(lowerCharRegex, i18nMark('At least one lowercase character is required'))
  .matches(upperCaseRegex, i18nMark('At least one uppercase character is required'))
  .matches(digitCharRegex, i18nMark('At least one digit is required'))
  .matches(specialCharRegex, i18nMark('At least one special character is required ($@!%*?&#_-)'))
  .matches(complexityRegex, i18nMark('Wrong password format'));

export default Yup;
