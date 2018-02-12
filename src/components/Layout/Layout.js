import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import HeaderBar from '../HeaderBar/HeaderBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './styles.css';

const Layout = ({ children, location, history }) => {
  return (
    <div className="appContentWrapper">
      <div className="appHeader">
        {location.pathname !== '/' ? <HeaderBar /> : null}
      </div>
      {location.pathname === '/items' || location.pathname.includes('profile') ? (
        <FloatingActionButton
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: '2'
          }}
          backgroundColor={'black'}
          onClick={() => history.push('/share')}
        >
          <ContentAdd />
        </FloatingActionButton>
      ) : null}
      <div className="appContent">{children}</div>
      {/* And a footer here, but not on the login route... */}
    </div>
  );
};

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

export default withRouter(Layout);
