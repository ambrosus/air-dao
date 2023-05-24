import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicRichText, PrismicText } from '@prismicio/react';
import { ReactComponent as Arrow } from '../assets/arrow.svg';
import PropTypes from 'prop-types';

export default function CommunityGovernance() {
  const data = usePrismicPageData('community_governance');

  console.log(data);

  return (
    data && (
      <section className={'community-governance'}>
        <div className={'container'}>
          <div className={'content'}>
            <h1 className={'community-governance__heading'}>
              <PrismicText field={data.heading} />
            </h1>
            <div className={'community-governance__lead'}>
              <PrismicRichText field={data.lead} />
            </div>
            <div className={'community-governance__voting-start'}>
              {data.starting_date_text}
            </div>
            <h2 className={'community-governance__subheading'}>
              <PrismicText field={data.subheading} />
            </h2>
            <div className={'community-governance__event-list'}>
              {data.calendar.map((item, i) => (
                <Event key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  );
}

function Event({
  status = '',
  date = '',
  date_to: dateTo = '',
  item_lead: itemLead = [],
  snapshot_link: snapshotLink = {},
  bottom_text: bottomText = '',
  bottom_text_arrow: bottomTextArrow = false,
  bottom_text_link: bottomTextLink,
}) {
  const children = (
    <>
      <div className={'governance-event__date'}>
        {date} {dateTo && ` - ${dateTo}`}
      </div>
      <div
        className={`governance-event__status governance-event__status_${statusMap[status]}`}
      >
        {status}
      </div>
      <div className={'governance-event__lead'}>
        <PrismicRichText field={itemLead} />
      </div>
      {bottomText && (
        <BottomText
          text={bottomText}
          arrow={bottomTextArrow}
          link={bottomTextLink}
        />
      )}
    </>
  );

  return snapshotLink.url ? (
    <a
      className={`governance-event governance-event_${statusMap[status]}`}
      href={snapshotLink.url}
      target={snapshotLink.target}
    >
      {children}
    </a>
  ) : (
    <div className={`governance-event governance-event_${statusMap[status]}`}>
      {children}
    </div>
  );
}

Event.propTypes = {
  status: PropTypes.oneOf(['Done', 'Active', 'Not started']),
  date: PropTypes.string,
  date_to: PropTypes.string,
  item_lead: PropTypes.arrayOf(PropTypes.object),
  snapshot_link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
  }),
  bottom_text: PropTypes.string,
  bottom_text_arrow: PropTypes.bool,
  bottom_text_link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
  }),
};

const statusMap = {
  Done: 'done',
  Active: 'active',
  'Not started': 'not-started',
};

function BottomText({ text, arrow, link }) {
  const children = (
    <>
      {text} {arrow && <Arrow />}
    </>
  );

  return link.url ? (
    <a
      className={'governance-event__bottom-text'}
      href={link.url}
      target={link.target}
    >
      {children}
    </a>
  ) : (
    <div className={'governance-event__bottom-text'}>{children}</div>
  );
}

BottomText.propTypes = {
  text: PropTypes.string,
  arrow: PropTypes.bool,
  link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string,
  }),
};