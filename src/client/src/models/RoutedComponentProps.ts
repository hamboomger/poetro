import { RouteComponentProps } from 'react-router-dom';
import ComponentProps from './ComponentProps';

export default interface RoutedComponentProps<T> extends
  ComponentProps, RouteComponentProps<T> { }
