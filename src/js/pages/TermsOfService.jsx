import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import TermsOfServiceBody from '../common/components/TermsOfServiceBody';
import { renderLog } from '../common/utils/logging';
import { OuterWrapper, PageWrapper } from '../common/components/Style/stepDisplayStyles';


class TermsOfService extends Component {
  static getProps () {
    return {};
  }

  render () {
    renderLog('TermsOfService');  // Set LOG_RENDER_EVENTS to log all renders
    return (
      <div>
        <Helmet title="Terms of Service - WeVote.US Campaigns" />
        <PageWrapper>
          <OuterWrapper>
            <InnerWrapper>
              <TermsOfServiceBody />
            </InnerWrapper>
          </OuterWrapper>
        </PageWrapper>
      </div>
    );
  }
}

const InnerWrapper = styled.div``;

export default TermsOfService;
