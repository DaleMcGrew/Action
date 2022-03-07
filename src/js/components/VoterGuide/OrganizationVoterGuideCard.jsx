import { Twitter } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import styled from 'styled-components';
import historyPush from '../../common/utils/historyPush';
import { renderLog } from '../../common/utils/logging';
import { numberWithCommas, removeTwitterNameFromDescription } from '../../utils/textFormat';
import LoadingWheelComp from '../../common/components/Widgets/LoadingWheelComp';
import ParsedTwitterDescription from '../Twitter/ParsedTwitterDescription';
// import IssuesByOrganizationDisplayList from '../Values/IssuesByOrganizationDisplayList';
import ExternalLinkIcon from '../../common/components/Widgets/ExternalLinkIcon';

const OpenExternalWebSite = React.lazy(() => import(/* webpackChunkName: 'OpenExternalWebSite' */ '../../common/components/Widgets/OpenExternalWebSite'));

// This Component is used to display the Organization by TwitterHandle
// Please see VoterGuide/Organization for the Component used by GuideList for Candidate and Opinions (you can follow)
class OrganizationVoterGuideCard extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit () {
    historyPush(`/voterguideedit/${this.props.organization.organization_we_vote_id}`);
    return <div>{LoadingWheelComp}</div>;
  }

  render () {
    renderLog('OrganizationVoterGuideCard');  // Set LOG_RENDER_EVENTS to log all renders
    if (!this.props.organization) {
      return <div>{LoadingWheelComp}</div>;
    }
    // console.log('this.props.organization:', this.props.organization);
    const {
      organization_name: organizationName,
      organization_photo_url_large: organizationPhotoUrlLarge,
      organization_twitter_handle: organizationTwitterHandle,
      // organization_type: organizationType,
      // organization_we_vote_id: organizationWeVoteId,
      organization_website: organizationWebsiteRaw,
      twitter_description: twitterDescriptionRaw,
      twitter_followers_count: twitterFollowersCount,
      // linked_voter_we_vote_id: organizationLinkedVoterWeVoteId,
    } = this.props.organization;
    const organizationWebsite = organizationWebsiteRaw && organizationWebsiteRaw.slice(0, 4) !== 'http' ? `http://${organizationWebsiteRaw}` : organizationWebsiteRaw;

    // If the displayName is in the twitterDescription, remove it from twitterDescription
    const displayName = organizationName || '';
    const twitterDescription = twitterDescriptionRaw || '';
    const twitterDescriptionMinusName = removeTwitterNameFromDescription(displayName, twitterDescription);
    // const voterGuideLink = organizationTwitterHandle ? `/${organizationTwitterHandle}` : `/voterguide/${organizationWeVoteId}`;

    // console.log('OrganizationVoterGuideCard organizationLinkedVoterWeVoteId:', organizationLinkedVoterWeVoteId);
    return (
      <CardMain>
        { organizationPhotoUrlLarge ? (
          <ProfileAvatar>
            <ProfileAvatarImg src={organizationPhotoUrlLarge} alt={`${displayName}`} />
          </ProfileAvatar>
        ) : null}
        <br />
        <h3 className="card-main__display-name">{displayName}</h3>
        { organizationTwitterHandle && (
          <Suspense fallback={<></>}>
            <OpenExternalWebSite
              linkIdAttribute="organizationTwitterHandle"
              url={`https://twitter.com/${organizationTwitterHandle}`}
              target="_blank"
              body={(
                <TwitterName>
                  <TwitterHandleWrapper>
                    @
                    {organizationTwitterHandle}
                  </TwitterHandleWrapper>
                  { !!(twitterFollowersCount && String(twitterFollowersCount) !== '0') && (
                    <TwitterFollowersBadge>
                      <Twitter />
                      {numberWithCommas(twitterFollowersCount)}
                    </TwitterFollowersBadge>
                  )}
                </TwitterName>
              )}
            />
          </Suspense>
        )}
        { organizationWebsite && (
          <OrganizationWebsiteWrapper>
            <Suspense fallback={<></>}>
              <span className="u-wrap-links">
                <OpenExternalWebSite
                  linkIdAttribute="organizationWebsite"
                  url={organizationWebsite}
                  target="_blank"
                  body={(
                    <span>
                      {organizationWebsite}
                      {' '}
                      <ExternalLinkIcon />
                    </span>
                  )}
                />
              </span>
            </Suspense>
          </OrganizationWebsiteWrapper>
        )}
        { twitterDescriptionMinusName && !this.props.turnOffDescription ? (
          <TwitterDescription>
            <ParsedTwitterDescription
              twitter_description={twitterDescriptionMinusName}
            />
          </TwitterDescription>
        ) :
          <p className="card-main__description" />}
      </CardMain>
    );
  }
}
OrganizationVoterGuideCard.propTypes = {
  organization: PropTypes.object.isRequired,
  // isVoterOwner: PropTypes.bool,
  turnOffDescription: PropTypes.bool,
};

const CardMain = styled.div`
  border: 1px solid #fff;
  padding: 0px !important;
  font-size: 14px;
  position: relative;
`;

const OrganizationWebsiteWrapper = styled.div`
  margin-top: 0px;
`;

const ProfileAvatar = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  position: relative;
`;

const ProfileAvatarImg = styled.img`
  border-radius: 100px;
`;

const TwitterDescription = styled.div`
  margin-top: 10px;
`;

const TwitterFollowersBadge = styled.span`
  color: #999;
  display: inline-block;
  line-height: 1.25rem;
  padding: 4px 0;
  white-space: nowrap;
`;

const TwitterHandleWrapper = styled.span`
  color: #999;
  margin-right: 10px;
`;

const TwitterName = styled.div`
`;

export default OrganizationVoterGuideCard;
