import React, { useState } from 'react';
import { InputContainer, InputIcon, Input } from '../pages/Payments/Payment.styles'

interface InputFieldProps {
	type: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	Icon: React.ComponentType;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, Icon }) => {
	return (
		<InputContainer>
			<InputIcon>
				<Icon />
			</InputIcon>
			<Input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</InputContainer>
	);
};

export default InputField;