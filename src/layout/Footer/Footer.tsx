import React from 'react';
import styled from 'styled-components/macro';

export type FooterProps = {};

const MainFooter = styled.footer`background-color: #fafafa;`;
export default class Footer extends React.Component<FooterProps, any> {
  public render() {
    return <MainFooter>Footer</MainFooter>;
  }
}
