import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { OuterWrapper, PageWrapper } from '../common/components/Style/stepDisplayStyles';
import attributionText from '../common/constants/attributionText';
import { renderLog } from '../common/utils/logging';
import compileDate from '../compiledDate';


class Attributions extends Component {
  static getProps () {
    return {};
  }

  static parseLicense (oneLicense) {
    const result = [];
    const lines = oneLicense.split('\n');
    for (let index = 0; index < lines.length; index++) {
      if (index === 0) {
        result.push(
          <div key={index}>
            <br />
            <b>{lines[index]}</b>
          </div>,
        );
      } else {
        result.push(
          <div key={index}>
            {lines[index]}
          </div>,
        );
      }
    }
    return result;
  }

  render () {
    renderLog('Attributions');  // Set LOG_RENDER_EVENTS to log all renders

    return (
      <div>
        <Helmet title="Attributions - WeVote.US Campaigns" />
        <PageWrapper>
          <OuterWrapper>
            <InnerWrapper>
              <ContentTitle>
                WeVote.US Open Source Software Licenses
              </ContentTitle>
              <div>
                Please also see
                {' '}
                <Link to="/credits">
                  Credits &amp; Thanks
                </Link>
                .
              </div>
              { attributionText.map((oneLicense) => (
                Attributions.parseLicense(oneLicense)
              ))}
              <CompileDate>
                Compile date:&nbsp;&nbsp;
                { compileDate }
              </CompileDate>
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

const CompileDate = styled.div`
  margin: 20px 0;
`;

const ContentTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 20px;
  }
`;

const InnerWrapper = styled.div`
`;

export default withStyles(styles)(Attributions);
