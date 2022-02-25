import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import logoLight from '../../../img/global/svg-icons/we-vote-logo-horizontal-color-200x66.svg';
import logoDark from '../../../img/global/svg-icons/we-vote-logo-horizontal-color-dark-141x46.svg';


class HeaderBarLogo extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    const { classes } = this.props;

    const light = false;
    return (
      <HeaderBarWrapper>
        <WeVoteLogoWrapper>
          <Link
            className={classes.logoLinkRoot}
            to="/"
            id="logoHeaderBar"
          >
            <img
              width="141"
              height="44"
              alt="We Vote logo"
              src={light ? logoLight : logoDark}
            />
            <SubtitleOuter>
              <SubtitleInner>
                admin
              </SubtitleInner>
            </SubtitleOuter>
          </Link>
        </WeVoteLogoWrapper>
      </HeaderBarWrapper>
    );
  }
}
HeaderBarLogo.propTypes = {
  classes: PropTypes.object,
};

const styles = () => ({
  logoLinkRoot: {
    height: 0,
    fontSize: 0,
  },
});

const SubtitleInner = styled.span`
  position: absolute;
  font-size: 10px;
  right: 16px;
  top: -15px;
  color: #2e3c5d;
`;

const SubtitleOuter = styled.span`
  position: relative;
`;

const HeaderBarWrapper = styled.div`
  height: 42px;
`;

const WeVoteLogoWrapper = styled.div`
  height: 42px;
  min-width: 141px;
`;

export default withStyles(styles)(HeaderBarLogo);
