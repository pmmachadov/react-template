import React from 'react'
import {
	AutocompleteSmart,
	CheckboxGroupSmart,
	DateTimeSmart,
	FormSmart,
	PasswordSmart,
	PhoneSmart,
	RadioGroupSmart,
	SelectSmart,
	SwitchSmart,
	TextFieldSmart
} from '@kudaterbang/ui-mui-react-example'
import apiStrapi from '@kudaterbang/data-access-strapi';

type TypeForm = {
	textFieldSmart: string
	checkboxGroupSmart: {
		first: boolean
		second: boolean
		third: boolean
	}
	switchSmart: {
		first: boolean
		second: boolean
	}
	dateDesktop: string
	dateMobile: string
	datetime: string
	time: string
	radioGroupSmart: string
	password: string
	autocompleteStatic: string
	autocompleteFetch: string
	selectStatic: string
	selectFetch: string
	phoneSmart: string
}

const dataCheckbox = [
  {
    key: 'first',
    label: 'Satu',
    value: 1,
  },
  {
    key: 'second',
    label: 'Dua',
    value: 2,
    disabled: true,
  },
  {
    key: 'third',
    label: 'Tiga',
    value: 3,
  },
];
const dataSwitch = [
  {
    key: 'first',
    label: 'First',
  },
  {
    key: 'second',
    label: 'Second',
  },
];
const options = [
  {
    label: 'First',
    value: 'first',
  },
  {
    label: 'Second',
    value: 'second',
  },
];

const SmartInputView = () => {
	return (
		<FormSmart<TypeForm> onSubmit={(data) => {
			console.log('submit data', data)
		}}>
			<TextFieldSmart name="textFieldSmart" label="Text Field Smart" />
			<CheckboxGroupSmart
				name="checkboxGroupSmart"
				label="Check Box Group Smart"
				data={dataCheckbox}
				value={{
					first: false,
					second: true,
					third: true,
				}}
			/>
			<SwitchSmart
				name="switchSmart"
				label="Switch Smart"
				data={dataSwitch}
				value={{
					first: false,
					second: true,
				}}
			/>
			<DateTimeSmart
				name="dateDesktop"
				type="date-desktop"
				label="Date Desktop"
			/>
			<DateTimeSmart
				name="dateMobile"
				type="date-mobile"
				label="Date Mobile"
			/>
			<DateTimeSmart
				name="datetime"
				type="datetime"
				label="Datetime"
			/>
			<DateTimeSmart
				name="time"
				type="time"
				label="Time"
			/>
			<RadioGroupSmart
				name="radioGroupSmart"
				label="Radio Group"
				options={options}
				value={options[0].value}
			/>
			<PasswordSmart
				name="password"
				label="Password"
			/>
			<AutocompleteSmart
				name="autocompleteStatic"
				label="Autocomplete static"
				options={options}
			/>
			<AutocompleteSmart
				name="autocompleteFetch"
				type="fetch"
				label="Autocomplete fetch"
				fetchOptions={{
					fetchFunction: async (inputText: string) => {
						const { data } = await apiStrapi.productsGet({
							params: {
								title: inputText,
							},
						});
						return (
							data?.data.map((item) => ({
								label: item.attributes.product_name,
								value: item.id,
							})) || []
						);
					},
				}}
			/>
			<SelectSmart
				name="selectStatic"
				label="Select static"
				options={options}
			/>
			<SelectSmart
				name="selectFetch"
				label="Select fetch"
				type="fetch"
				fetchOptions={{
					fetchFunction: async () => {
						const { data } = await apiStrapi.productsGet();
						return (
							data?.data.map((item) => ({
								label: item.attributes.product_name,
								value: String(item.id),
							})) || []
						);
					},
				}}
			/>
			<PhoneSmart
				name="phoneSmart"
				label="Phone Number"
			/>
		</FormSmart>
	)
}

export default SmartInputView
