import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicText, PrismicRichText } from '@prismicio/react';
import { ReactComponent as LinkedInIcon } from '../assets/linkedin-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import bg from '../assets/background.png';
import { useState } from 'react';
import UiButton from '../components/UiButton';
import {Helmet} from "react-helmet";

const Team = () => {
  const data = usePrismicPageData('team');
  const [isHidden, setIsHidden] = useState(true);

  return (
    data && (
      <div className='container'>
        <Helmet>
          <link rel="canonical" href="https://airdao.io/team/" />
          <title>AirDAO Team</title>
          <meta
            name='description'
            content='Meet our team. Follow us on LinkedIn for job opportunities and updates'
          />
        </Helmet>
        <section className='team-page'>
          <img className='background' src={bg} alt='background' />
          <h1 className='team-page__heading'>
            <PrismicText field={data.heading} />
          </h1>
          <p className='team-page__lead'>
            <PrismicText field={data.lead_text} />
          </p>

          <div
            className={`team-page__members ${
              isHidden ? 'team-page__member_hidden' : 'hui'
            }`}
          >
            {data.team_members.map((member, i) => (
              <div className='team-page__member' key={`team-member-${i}`}>
                <div className='team-page__member-photo-container'>
                  {member.photo.url && (
                    <img
                      className='team-page__member-photo'
                      src={member.photo.url}
                      alt={member.photo.alt}
                    />
                  )}
                </div>
                <h3 className='team-page__member-name'>{member.name}</h3>
                <h4 className='team-page__member-position'>
                  {member.position}
                </h4>
                <div className='team-page__socials-container'>
                  {member?.linkedin_link.url && (
                    <a
                      rel="nofollow"
                      href={member?.linkedin_link.url}
                      target={member?.linkedin_link.target}
                      className='team-page__social-link'
                    >
                      <LinkedInIcon className='team-page__social-icon' />
                    </a>
                  )}
                  {member?.twitter_link.url && (
                    <a
                      href={member?.twitter_link.url}
                      target={member?.twitter_link.target}
                      className='team-page__social-link team-page__social-link_twitter'
                    >
                      <TwitterIcon className='team-page__social-icon' />
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div className='team-page__members-button-overlay'>
              <UiButton
                withBorder
                className='team-page__show-members-button'
                onClick={() => setIsHidden(false)}
              >
                Expand Team List
              </UiButton>
            </div>
          </div>

          <PrismicRichText
            field={data.linkedin_lead_text}
            components={{
              paragraph: ({ children }) => (
                <p className={'team-page__linkedin-lead'}>{children}</p>
              ),
            }}
          />
        </section>
      </div>
    )
  );
};

export default Team;
