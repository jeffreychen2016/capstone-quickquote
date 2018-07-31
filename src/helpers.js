const formatPrice = (cents) => {
  return (cents).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export default formatPrice;
