import React from 'react';
import { Description, StepContainer, StepNumber, Title } from './styles';

interface StepProps {
  step: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ step, title, description, children }) => {
  return (
    <StepContainer key={step}>
      <StepNumber>{step}</StepNumber>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {/* <div
        style={{
          width: 320,
          height: 180,
          borderRadius: 10,
          border: '2px solid #ffffff30',
        }}
      /> */}
      <>{children}</>
    </StepContainer>
  );
};

export default Step;
