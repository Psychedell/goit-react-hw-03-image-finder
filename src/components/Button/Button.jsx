import { ButtonLoad } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonLoad type="button" onClick={onLoadMore}>
      Load More
    </ButtonLoad>
  );
};
