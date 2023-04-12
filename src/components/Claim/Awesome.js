import UiButton from "../UiButton";

const Awesome = () => (
  <>
    <h2 className='claim-block__title'>You&apos;re Awesome!</h2>
    <p className='claim-block__text'>
      You have claimed all available rewards. Want to earn more? Share the
      AirBond Marketplace waitlist and win AMB!
    </p>
    <p className='claim-block__subtitle'>
      Share using Gleam to win from our prize pool of 44,444 AMB!
    </p>
    <UiButton
      withBorder
      className='claim-block__btn claim-block__btn_marketplace'
    >
      <a href='/'>Enter Gleam Competition</a>
    </UiButton>
  </>
);

export default Awesome;
