import { usePrismicPageData } from '../hooks/usePrismicPageData';
import { PrismicText } from '@prismicio/react';
import UiButton from '../components/UiButton';

const Ambassadors = () => {
  const data = usePrismicPageData('ambassador');

  return (
    data && (
    <div className="ambassadors">
      <div className="container">
        <div className="content">
          <img src={data.ambassador_img.url} alt="ambassadors" className="ambassadors__img"/>
          <h1 className="ambassadors__title">
            <PrismicText field={data.ambassador_title} />
          </h1>
          <p className="ambassadors__text">
            <PrismicText field={data.ambassador_text} />
          </p>
          <p className="ambassadors__text">
            <PrismicText field={data.ambassadors_text_2} />
          </p>
          <UiButton withBorder className="ambassadors__btn">
            <a href={data.ambassador_link} target="_blank" rel="nofollow noreferrer">
              <PrismicText field={data.ambassador_link_text} />
            </a>
          </UiButton>
        </div>
      </div>
    </div>
  ))
};

export default Ambassadors;
