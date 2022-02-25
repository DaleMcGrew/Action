import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import CreditsBody from '../common/components/CreditsBody';
import { renderLog } from '../common/utils/logging';
import { OuterWrapper, PageWrapper } from '../common/components/Style/stepDisplayStyles';


class Credits extends Component {
  static getProps () {
    return {};
  }

  render () {
    renderLog('Credits');  // Set LOG_RENDER_EVENTS to log all renders
    return (
      <div>
        <Helmet title="Credits and Thanks - WeVote.US Campaigns" />
        <PageWrapper>
          <OuterWrapper>
            <InnerWrapper>
              <ContentTitle>
                Credits &amp; Thanks
              </ContentTitle>
              <Section>
                <CreditsBody />
              </Section>
            </InnerWrapper>
          </OuterWrapper>
        </PageWrapper>
      </div>
    );
  }
}

const styles = (theme) => ({
  buttonContained: {
    borderRadius: 32,
    height: 50,
    [theme.breakpoints.down('md')]: {
      height: 36,
    },
  },
});

const ContentTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 20px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: white;
`;

const Section = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  align-items: center;
  width: 100%;
`;

export default withStyles(styles)(Credits);
