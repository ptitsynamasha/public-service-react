import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { makeSelectToken } from 'containers/App/selectors';
import { connect } from 'react-redux';
import messages from './messages';
import HeaderLink from './HeaderLink';
// styled.div`
//   text-align: center;
// `;
function NavBar(props) {
  const authToken = props.token;
  const headerLinkArray = [];
  headerLinkArray.push(
    {
      link: '/',
      title: 'Home',
    },
    {
      link: '/features',
      title: 'Features',
    },
  );

  if (authToken) {
    headerLinkArray.push({
      link: '/menu',
      title: 'Menu',
    });
    headerLinkArray.push({
      link: '/indication',
      title: 'Indication',
    });
  } else {
    headerLinkArray.push({
      link: '/login',
      title: 'Login',
    });
  }

  const listItems = headerLinkArray.map(({ link, title }, index) => (
    <HeaderLink key={index} to={link}>
      {title}
    </HeaderLink>
  ));

  return <div>{listItems}</div>;
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
});

export default connect(mapStateToProps)(NavBar);
