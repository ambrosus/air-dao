import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicText, PrismicRichText } from '@prismicio/react';
import { ReactComponent as LinkedInIcon } from '../assets/linkedin-icon.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import bg from '../assets/background.png';

const Team = () => {
  const data = usePrismicPageData('team');
  return (
    data && (
      <div className='container'>
        <section className='team-page'>
          <img className='background' src={bg} alt='background' />
          <h1 className='team-page__heading'>
            <PrismicText field={data.heading} />
          </h1>
          <p className='team-page__lead'>
            <PrismicText field={data.lead_text} />
          </p>

          <div className='team-page__members'>
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
                  <a
                    href={member?.linkedin_link.url}
                    target={member?.linkedin_link.target}
                    className='team-page__social-link'
                  >
                    <LinkedInIcon className='team-page__social-icon' />
                  </a>
                  <a
                    href={member?.twitter_link.url}
                    target={member?.twitter_link.target}
                    className='team-page__social-link'
                  >
                    <TwitterIcon className='team-page__social-icon' />
                  </a>
                </div>
              </div>
            ))}
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