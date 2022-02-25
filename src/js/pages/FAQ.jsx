import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import FAQBody from '../common/components/FAQBody';
import { lazyLoader, libraryNeedsLoading } from '../utils/lazyLoader';
import { renderLog } from '../common/utils/logging';
import { OuterWrapper, PageWrapper } from '../common/components/Style/stepDisplayStyles';


class FAQ extends Component {
  static getProps () {
    return {};
  }

  componentDidMount () {
    const library = 'fontawesome';
    if (libraryNeedsLoading(library)) {
      lazyLoader(library)
        .then((result) => {
          console.log('lazy loader for fontawesome returned: ', result);
          // eslint-disable-next-line react/no-unused-state
          this.setState({ result }); // to force a reload
        });
    }
  }

  render () {
    renderLog('FAQ');  // Set LOG_RENDER_EVENTS to log all renders
    return (
      <div>
        <Helmet title="FAQ - WeVote.US Campaigns" />
        <PageWrapper>
          <OuterWrapper>
            <InnerWrapper>
              <FAQBody />
            </InnerWrapper>
          </OuterWrapper>
        </PageWrapper>
      </div>
    );
  }
}

const styles = () => ({
  buttonRoot: {
    width: 250,
  },
});

const InnerWrapper = styled.div`
`;

export default withStyles(styles)(FAQ);
