import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import avatarGeneric from '../../../img/global/icons/avatar-generic.png';
import LazyImage from '../../common/components/LazyImage';
import { renderLog } from '../../common/utils/logging';
import { shortenText } from '../../utils/textFormat';
import VoterStore from '../../stores/VoterStore';


class VoterNameAndPhoto extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
    this.onVoterStoreChange();
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
  }

  componentWillUnmount () {
    this.voterStoreListener.remove();
  }

  onVoterStoreChange () {
    // console.log('VoterNameAndPhoto onVoterStoreChange voter:', VoterStore.getVoter());
    const voter = VoterStore.getVoter();
    let voterIsSignedIn = false;
    let voterPhotoUrlMedium;
    if (voter) {
      const { is_signed_in: signedIn, voter_photo_url_medium: photoURL  } = voter;
      voterIsSignedIn  = signedIn;
      voterPhotoUrlMedium = photoURL;
    }
    const voterFirstName = VoterStore.getFirstName();
    this.setState({
      voterFirstName,
      voterIsSignedIn,
      voterPhotoUrlMedium,
    });
  }

  render () {
    renderLog('VoterNameAndPhoto');  // Set LOG_RENDER_EVENTS to log all renders
    // console.log('VoterNameAndPhoto voterIsSignedIn at start of render: ', voterIsSignedIn);
    const { classes } = this.props;
    const { voterFirstName, voterIsSignedIn, voterPhotoUrlMedium } = this.state;

    return (
      <Wrapper>
        {voterIsSignedIn ? (
          <NamePhotoMenuWrapper>
            <NameAndPhotoWrapper id="nameAndPhotoWrapper">
              <FirstNameWrapper id="firstNameWrapper">
                {shortenText(voterFirstName, 9)}
              </FirstNameWrapper>
              {voterPhotoUrlMedium ? (
                <LazyImage
                  src={voterPhotoUrlMedium}
                  placeholder={avatarGeneric}
                  className="profile-photo"
                  height={24}
                  width={24}
                  alt="Your Settings"
                />
              ) : (
                <AccountCircle classes={{ root: classes.accountCircleRoot }} />
              )}
            </NameAndPhotoWrapper>
            <div className="u-show-mobile-tablet">
              <MenuIcon id="mainHeaderBarDropDownMenuIcon" classes={{ root: classes.menuIconRoot }} />
            </div>
          </NamePhotoMenuWrapper>
        ) : (
          <>
            <MenuIcon id="mainHeaderBarDropDownMenuIcon" classes={{ root: classes.menuIconRoot }} />
          </>
        )}
      </Wrapper>
    );
  }
}
VoterNameAndPhoto.propTypes = {
  classes: PropTypes.object,
};

const styles = () => ({
  accountCircleRoot: {
    color: '#999',
  },
  menuIconRoot: {
    color: '#999',
  },
});

const FirstNameWrapper = styled.div`
  color: #999;
  font-size: 14px;
  padding-right: 4px;
`;

const NameAndPhotoWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 6px;
`;

const NamePhotoMenuWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Wrapper = styled.div`
  margin-right: 2px;
`;

export default withStyles(styles)(VoterNameAndPhoto);
